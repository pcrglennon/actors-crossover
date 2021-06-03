import { CrossoverMovie, MovieCastCredit } from '../../generated/graphql';

export type MovieWithCredits = Omit<CrossoverMovie, 'crossoverCredits'> & {
  crossoverCredits: Array<Pick<MovieCastCredit, 'actorId' | 'characterName'>>
};
