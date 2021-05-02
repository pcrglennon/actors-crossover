import React, { useState } from 'react';

import { ActorSearchResult, useActorSearchQuery } from '../../generated/graphql';

import './ActorSearch.css';

interface IProps {
  onActorSelect: (result: ActorSearchResult) => void
}

export function ActorSearch(props: IProps) {
  const [searchInput, setSearchInput] = useState('');

  const { loading, error, data } = useActorSearchQuery({
    variables: { queryString: searchInput },
    skip: searchInput.length <= 2
  });

  function onActorSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    const actorSearchResult = data?.actorSearch.results.find(actorSearchResult => {
      return actorSearchResult.id === Number(event.target.value);
    })!;

    if (actorSearchResult) {
      props.onActorSelect(actorSearchResult);
    }
  }

  return (
    <div className="actor-search">
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      {loading && (<p>loading...</p>)}

      {error && (<p>error: {error}</p>)}

      {data?.actorSearch && (
        <select onChange={onActorSelected}>
          {data.actorSearch.results.map((actorSearchResult) => (
            <option
              key={actorSearchResult.id}
              value={actorSearchResult.id}
            >
              {actorSearchResult.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
