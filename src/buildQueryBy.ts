import type { Field } from './Field';

/**
 * Builds a string referencing `string | string[]` fields.
 *
 * https://typesense.org/docs/0.24.0/api/search.html#query-parameters
 */
export function buildQueryBy<T>(fields: Field<T>[]) {
  return fields.join(',');
}
