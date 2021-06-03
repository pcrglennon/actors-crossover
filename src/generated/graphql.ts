import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type ActorSearchResponse = {
  __typename?: 'ActorSearchResponse';
  results: Array<ActorSearchResult>;
  meta: ActorSearchResponseMeta;
};

export type ActorSearchResponseMeta = {
  __typename?: 'ActorSearchResponseMeta';
  page: Scalars['Int'];
  totalResults: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ActorSearchResult = {
  __typename?: 'ActorSearchResult';
  id: Scalars['Int'];
  name: Scalars['String'];
  profilePath?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CrossoverMovie = {
  __typename?: 'CrossoverMovie';
  id: Scalars['Int'];
  title: Scalars['String'];
  releaseDate: Scalars['String'];
  posterPath?: Maybe<Scalars['String']>;
  crossoverCredits: Array<MovieCastCredit>;
};

export type MovieCastCredit = {
  __typename?: 'MovieCastCredit';
  actorId: Scalars['Int'];
  movieId: Scalars['Int'];
  characterName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  actorSearch: ActorSearchResponse;
  crossoverMovies: Array<CrossoverMovie>;
};


export type QueryActorSearchArgs = {
  queryString: Scalars['String'];
  page: Scalars['Int'];
};


export type QueryCrossoverMoviesArgs = {
  actorIds: Array<Scalars['Int']>;
};


export type ActorSearchQueryVariables = Exact<{
  queryString: Scalars['String'];
}>;


export type ActorSearchQuery = (
  { __typename?: 'Query' }
  & { actorSearch: (
    { __typename?: 'ActorSearchResponse' }
    & { results: Array<(
      { __typename?: 'ActorSearchResult' }
      & Pick<ActorSearchResult, 'id' | 'name'>
    )>, meta: (
      { __typename?: 'ActorSearchResponseMeta' }
      & Pick<ActorSearchResponseMeta, 'totalResults' | 'totalPages'>
    ) }
  ) }
);

export type CrossoverMoviesQueryVariables = Exact<{
  actorIds: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CrossoverMoviesQuery = (
  { __typename?: 'Query' }
  & { crossoverMovies: Array<(
    { __typename?: 'CrossoverMovie' }
    & Pick<CrossoverMovie, 'id' | 'title' | 'releaseDate' | 'posterPath'>
    & { crossoverCredits: Array<(
      { __typename?: 'MovieCastCredit' }
      & Pick<MovieCastCredit, 'actorId' | 'characterName'>
    )> }
  )> }
);


export const ActorSearchDocument = gql`
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

/**
 * __useActorSearchQuery__
 *
 * To run a query within a React component, call `useActorSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useActorSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActorSearchQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useActorSearchQuery(baseOptions: Apollo.QueryHookOptions<ActorSearchQuery, ActorSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActorSearchQuery, ActorSearchQueryVariables>(ActorSearchDocument, options);
      }
export function useActorSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActorSearchQuery, ActorSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActorSearchQuery, ActorSearchQueryVariables>(ActorSearchDocument, options);
        }
export type ActorSearchQueryHookResult = ReturnType<typeof useActorSearchQuery>;
export type ActorSearchLazyQueryHookResult = ReturnType<typeof useActorSearchLazyQuery>;
export type ActorSearchQueryResult = Apollo.QueryResult<ActorSearchQuery, ActorSearchQueryVariables>;
export const CrossoverMoviesDocument = gql`
    query CrossoverMovies($actorIds: [Int!]!) {
  crossoverMovies(actorIds: $actorIds) {
    id
    title
    releaseDate
    posterPath
    crossoverCredits {
      actorId
      characterName
    }
  }
}
    `;

/**
 * __useCrossoverMoviesQuery__
 *
 * To run a query within a React component, call `useCrossoverMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCrossoverMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCrossoverMoviesQuery({
 *   variables: {
 *      actorIds: // value for 'actorIds'
 *   },
 * });
 */
export function useCrossoverMoviesQuery(baseOptions: Apollo.QueryHookOptions<CrossoverMoviesQuery, CrossoverMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrossoverMoviesQuery, CrossoverMoviesQueryVariables>(CrossoverMoviesDocument, options);
      }
export function useCrossoverMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrossoverMoviesQuery, CrossoverMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrossoverMoviesQuery, CrossoverMoviesQueryVariables>(CrossoverMoviesDocument, options);
        }
export type CrossoverMoviesQueryHookResult = ReturnType<typeof useCrossoverMoviesQuery>;
export type CrossoverMoviesLazyQueryHookResult = ReturnType<typeof useCrossoverMoviesLazyQuery>;
export type CrossoverMoviesQueryResult = Apollo.QueryResult<CrossoverMoviesQuery, CrossoverMoviesQueryVariables>;