import { buildFilterBy, FilterByQuery } from './buildFilterBy';

export type FacetQuery<T> = FilterByQuery<T>;

/**
 * Builds a facet query to filters by facet values. It supports only [a single field at the moment](https://github.com/typesense/typesense/issues/590).
 *
 * https://typesense.org/docs/0.24.0/api/search.html#faceting-parameters
 */
export function buildFacetQuery<T>(query: FacetQuery<T>) {
  return buildFilterBy(query);
}
