import { Field } from './Field';

/**
 * Builds a comma-separated list of fields from the document.
 */
export function buildFieldsList<T>(fields: Field<T>[]) {
  return fields.join(',');
}
