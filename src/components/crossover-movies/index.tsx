import React from 'react';

import { CrossoverMovie, MovieCastCredit } from '../../generated/graphql';

type MovieWithCredits = Omit<CrossoverMovie, 'crossoverCredits'> & {
  crossoverCredits: Array<Pick<MovieCastCredit, 'actorId' | 'characterName'>>
};

interface IProps {
  movies: MovieWithCredits[]
}

export function CrossoverMovies(props: IProps) {
  function formatMovie(movie: MovieWithCredits) {
    const credits = movie.crossoverCredits.map(credit => {
      return `Actor ID: ${credit.actorId}, Character Name: ${credit.characterName}`;
    });

    return `Title: ${movie.title}, credits: ${credits}`;
  }

  return (
    <ul>
      {props.movies.map(movie => (
        <li key={movie.id}>
          {formatMovie(movie)}
        </li>
      ))}
    </ul>
  );
}
