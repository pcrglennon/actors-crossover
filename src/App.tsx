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

function App() {
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

  function selectedActorIds() {
    return selectedActors.map(({ id }) => id);
  }

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <h1>Actors-Crossover</h1>

        <div className="container">
          <div className="search">
            <h3>Select one or more actors</h3>

            <ActorSearch
              onActorSelect={onActorSelect}
            />

            <ul>
              {selectedActors.map(actorSearchResult => (
                <li key={actorSearchResult.id}>
                  {actorSearchResult.name} (ID: {actorSearchResult.id})
                </li>
              ))}
            </ul>
          </div>

          <div className="results">
            <button
              disabled={selectedActors.length <= 1}
              onClick={() => getCrossoverMovies({ variables: { actorIds: selectedActorIds() } })}
            >
              Find Movies
            </button>

            {loading && (<p>loading...</p>)}

            {error && (<p>error: {error}</p>)}

            {data?.crossoverMovies && (
              <CrossoverMovies
                movies={data.crossoverMovies}
              />
            )}
          </div>
        </div>

        <div className="tmdb-api-link">
          <h4>Powered by The Movie Database API</h4>
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer">
            <img alt="Powered by The Movie DB" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg" />
         </a>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
