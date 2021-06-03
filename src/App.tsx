import { Button, Col, Layout, Row, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React, { useState } from 'react';

import { ActorSearch } from './components/actor-search';
import { CrossoverMovies } from './components/crossover-movies';
import { ActorSearchResult, useCrossoverMoviesLazyQuery } from './generated/graphql';

import './App.css';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_API_URL,
  cache: new InMemoryCache()
});

const App = () => {
  const [selectedActors, setSelectedActors] = useState<ActorSearchResult[]>([]);

  const [getCrossoverMovies, { loading, error, data }] = useCrossoverMoviesLazyQuery({
    client: client
  });

  function onActorSelect(actorSearchResult: ActorSearchResult) {
    setSelectedActors([
      ...selectedActors,
      actorSearchResult
    ]);
  }

  function removeActor(actorId: number) {
    setSelectedActors(selectedActors.filter(actor => actor.id !== actorId));
  }

  function selectedActorIds() {
    return selectedActors.map(({ id }) => id);
  }

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Layout.Header>
          <h1 style={{ margin: 0, color: 'white' }}>
            Actors-Crossover
          </h1>
        </Layout.Header>

        <Layout.Content style={{ padding: '40px 50px' }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <div className="search">
                <h3>Select one or more actors</h3>

                <ActorSearch
                  onActorSelect={onActorSelect}
                  selectedActorIds={selectedActorIds()}
                />

                <ul>
                  {selectedActors.map(actorSearchResult => (
                    <li key={actorSearchResult.id}>
                      {actorSearchResult.name}

                      <Button
                        onClick={(_e) => { removeActor(actorSearchResult.id) }}
                        icon={<CloseOutlined />}
                        shape="circle"
                        size="small"
                        style={{ marginLeft: '10px' }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <div className="results">
                <Button
                  type="primary"
                  disabled={selectedActors.length <= 1}
                  loading={loading}
                  onClick={() => getCrossoverMovies({ variables: { actorIds: selectedActorIds() } })}
                >
                  Find Movies
                </Button>

                {loading && (<p>loading...</p>)}

                {error && (<p>error: {error}</p>)}

                {data?.crossoverMovies && (
                  <CrossoverMovies
                    movies={data.crossoverMovies}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          <Space direction="vertical">
            <h4>Powered by The Movie Database API</h4>

            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
              <img
                alt="Powered by The Movie DB"
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                style={{ width: '240px', height: 'auto' }}
              />
            </a>
          </Space>
         </Layout.Footer>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
