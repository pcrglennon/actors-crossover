import { Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { ActorSearchResult, useActorSearchQuery } from '../../generated/graphql';

import './ActorSearch.css';

interface IProps {
  onActorSelect: (result: ActorSearchResult) => void;
}

export const ActorSearch = ({ onActorSelect }: IProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState<{ key: number, value: number, label: string }[]>([]);

  const { loading, data } = useActorSearchQuery({
    variables: { queryString: searchInput },
    skip: searchInput.length <= 2
  });

  useEffect(() => {
    if (data?.actorSearch.results) {
      setOptions(data.actorSearch.results.map(actorSearchResult => {
        return {
          key: actorSearchResult.id,
          value: actorSearchResult.id,
          label: actorSearchResult.name
        };
      }));
    }
  }, [data]);

  function onSelect(value: number) {
    const actorSearchResult = data?.actorSearch.results.find(actorSearchResult => {
      return actorSearchResult.id === value;
    });

    if (actorSearchResult) {
      onActorSelect(actorSearchResult);
    }
  }

  return (
    <Select
      searchValue={searchInput}
      onSearch={(value) => setSearchInput(value)}
      onSelect={onSelect}
      options={options}
      loading={loading}
      showSearch={true}
      filterOption={false}
      optionLabelProp="label"
      notFoundContent={loading ? <Spin size="small" /> : null}
      placeholder="Search for actors"
      style={{ width: '100%' }}
    />
  );
}
