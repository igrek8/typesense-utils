import type { Vector } from './Vector';

export type VectorQueryField<T, P extends string | undefined = undefined> = T extends Vector
  ? P
  : T extends (infer U)[]
  ? VectorQueryField<U, P>
  : T extends object
  ? { [K in keyof T & string]: VectorQueryField<T[K], P extends string ? `${P}.${K}` : K> }[keyof T & string]
  : never;

export type VectorQueryOptions = {
  $k?: number;
  $flat_search_cutoff?: number;
};

export type BuildVectorQuerySignature1<T> = [field: VectorQueryField<T>, vector: Vector, options?: VectorQueryOptions];

export type BuildVectorQuerySignature2<T> = [field: VectorQueryField<T>, id: string, options?: VectorQueryOptions];

/**
 * Builds a vector query to filter by vectors.
 *
 * https://typesense.org/docs/0.24.0/api/vector-search.html#vector-search
 */
export function buildVectorQuery<T>(...args: BuildVectorQuerySignature1<T> | BuildVectorQuerySignature2<T>): string {
  const [field, vector, options] = args;
  const params: string[] = [];
  if (Array.isArray(vector)) {
    params.push(JSON.stringify(vector));
  } else {
    params.push('[]');
    params.push(`id:${vector}`);
  }
  if (options?.$k !== undefined) {
    params.push(`k:${options.$k}`);
  }
  if (options?.$flat_search_cutoff !== undefined) {
    params.push(`flat_search_cutoff:${options.$flat_search_cutoff}`);
  }
  return `${field}:(${params})`;
}
