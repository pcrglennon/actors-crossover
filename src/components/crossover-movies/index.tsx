import { Space } from 'antd';
import React from 'react';

import { MovieWithCredits } from './typings';
import { CrossoverMovie } from './crossover-movie';

interface IProps {
  movies: MovieWithCredits[];
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
