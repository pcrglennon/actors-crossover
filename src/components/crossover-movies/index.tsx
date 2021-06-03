import { Space } from 'antd';
import React from 'react';

import { CrossoverMoviesQuery } from '../../generated/graphql';
import { CrossoverMovie } from './crossover-movie';

interface IProps {
  movies: CrossoverMoviesQuery['crossoverMovies'];
}

export const CrossoverMovies = ({ movies }: IProps) => {
  return (
    <ul>
      <Space direction="vertical">
        {movies.map(movie => (
          <li key={movie.id}>
            <CrossoverMovie movie={movie} />
          </li>
        ))}
      </Space>
    </ul>
  );
}
