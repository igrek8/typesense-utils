import { buildFieldsList } from './buildFieldsList';
import type { Field } from './Field';

/**
 * Builds a string referencing fields that will be used for faceting your results on.
 *
 * https://typesense.org/docs/0.24.0/api/search.html#faceting-parameters
 */
export function buildFacetBy<T>(fields: Field<T>[]) {
  return buildFieldsList<T>(fields);
}
