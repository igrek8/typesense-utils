import { buildFieldsList } from './buildFieldsList';
import { Field } from './Field';

/**
 * Builds an expression to aggregate search results into groups or buckets by specify one or more group_by fields.
 *
 * NOTE: To group on a particular field, it must be a faceted field.
 *
 * https://typesense.org/docs/0.24.0/api/search.html#grouping-parameters
 */
export function buildGroupBy<T>(fields: Field<T>[]) {
  return buildFieldsList<T>(fields);
}
