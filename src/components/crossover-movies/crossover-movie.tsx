import React from 'react';

import { CrossoverMoviesQuery } from '../../generated/graphql';

interface IProps {
  movie: CrossoverMoviesQuery['crossoverMovies'][0];
}

export const CrossoverMovie = ({ movie }: IProps) => {
  return (
    <div>
      <h4>
        {movie.title} ({movie.releaseDate})
      </h4>

      <ul>
        {movie.crossoverCredits.map((credit, index) => {
          return (
            <li key={index}>
              {credit.actorName}: {credit.characterName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
