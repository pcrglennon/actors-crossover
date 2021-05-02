import { gql } from '@apollo/client';

export const ACTOR_SEARCH = gql`
  query ActorSearch($queryString: String!) {
    actorSearch(queryString: $queryString, page: 1) {
      results {
        id
        name
      }
      meta {
        totalResults
        totalPages
      }
    }
  }
`;

export const CROSSOVER_MOVIES = gql`
  query CrossoverMovies($actorIds: [Int!]!) {
    crossoverMovies(actorIds: $actorIds) {
      id
      title
      crossoverCredits {
        actorId
        characterName
      }
    }
  }
`;
