import assert = require('assert');
import { buildFilterBy, FilterByQuery } from './buildFilterBy';
import { Geopoint } from './Geopoint';

export enum NullOrder {
  First,
  Last,
}

export enum Order {
  Asc,
  Desc,
}

export interface SortByBoolean {
  /**
   * Sorts in the specified order
   */
  $order: Order;
  /**
   * Specify sort for null, empty or missing values
   */
  $null?: NullOrder;
}

export interface SortByNumber {
  /**
   * Sorts in the specified order
   */
  $order: Order;
  /**
   * Specify sort for null, empty or missing values
   */
  $null?: NullOrder;
}

export interface SortByString {
  /**
   * Sorts in the specified order
   */
  $order: Order;
  /**
   * Specify sort for null, empty or missing values
   */
  $null?: NullOrder;
}

export type SortByGeopoint = {
  /**
   * Sorts within a geo point
   */
  $point: Geopoint;
  /**
   * Sorts in the specified order
   */
  $order: Order;
  /**
   * Sorts nearby places within a radius based on another attribute
   */
  $exclude_radius?: number;
  /**
   * Buckets geo points into "groups" around the $point
   */
  $precision?: number;
};

export interface SortByCondition<T> {
  /**
   * Sorts based on conditions
   */
  $expr: FilterByQuery<T>;
  $order: Order;
}

export interface SortByTextMatch {
  /**
   * Sorts based on conditions
   */
  $order: Order;
  /**
   * Divides the result set into 10 buckets from most relevant results to the least relevant
   */
  $buckets?: number;
}

type Operator<T> = T extends [lat: number, lng: number]
  ? SortByGeopoint
  : T extends (infer U)[]
  ? Operator<U>
  : T extends object
  ? SortByField<T>
  : T extends boolean
  ? SortByBoolean
  : T extends number
  ? SortByNumber
  : T extends string
  ? SortByString
  : never;

type SortByField<T> = {
  [K in keyof T]?: Operator<T[K]>;
};

export type SortBy<T> = { _text_match?: SortByTextMatch } | { _eval?: SortByCondition<T>[] } | SortByField<T>;

function next<T>(node: unknown, path: string[]): string {
  assert(node && typeof node === 'object');
  const terms: string[] = [];
  loop: for (const [key, value] of Object.entries(node)) {
    switch (key) {
      case '$point': {
        const { $order, $point, $exclude_radius, $precision } = node as SortByGeopoint;
        let expr = path.join('.');
        expr += '(';
        expr += $point.join(',');
        if ($precision) expr += `,precision:${$precision}km`;
        if ($exclude_radius) expr += `,exclude_radius:${$exclude_radius}km`;
        expr += ')';
        if ($order === Order.Asc) expr += ':asc';
        if ($order === Order.Desc) expr += ':desc';
        terms.push(expr);
        break loop;
      }
      case '$expr': {
        const { $expr, $order } = node as SortByCondition<T>;
        let expr = `_eval(${buildFilterBy($expr)})`;
        if ($order === Order.Asc) expr += ':asc';
        if ($order === Order.Desc) expr += ':desc';
        terms.push(expr);
        break loop;
      }
      default: {
        switch (key) {
          case '$order':
          case '$null':
          case '$buckets': {
            const { $order, $null, $buckets } = node as SortByNumber & SortByTextMatch;
            let expr = path.join('.');
            if ($null === NullOrder.First) expr += `(missing_values:first)`;
            if ($null === NullOrder.Last) expr += `(missing_values:last)`;
            if ($buckets !== undefined) expr += `(buckets:${$buckets})`;
            if ($order === Order.Asc) expr += ':asc';
            if ($order === Order.Desc) expr += ':desc';
            terms.push(expr);
            break loop;
          }
          default: {
            const expr = next(value, path.concat(key));
            if (expr) terms.push(expr);
            break;
          }
        }
        break;
      }
    }
  }
  return terms.join(',');
}

/**
 * Builds a sort expression with a list of fields and their corresponding sort orders that will be used for ordering your results.
 *
 * https://typesense.org/docs/0.24.0/api/search.html#sort-results
 */
export function buildSortBy<T>(query: SortBy<T>) {
  return next(query, []);
}
