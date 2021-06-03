import React from 'react';

import { MovieWithCredits } from './typings';

interface IProps {
  movie: MovieWithCredits;
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
              Actor ID: {credit.actorId}, Character: {credit.characterName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
