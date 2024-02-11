import * as assert from 'assert';
import type { Geopoint } from './Geopoint';

export type FilterByBoolean<T extends boolean> = {
  /**
   * Matches documents where the value of a field equals the specified value.
   */
  $eq?: T;
  /**
   * Selects the documents where the value of the field is not equal to the specified value. This includes documents that do not contain the field.
   */
  $ne?: T;
  /**
   * Selects the documents where the value of a field equals any value in the specified array
   */
  $in?: boolean[];
};

export type FilterByNumber<T extends number> = {
  /**
   * Selects the documents where the value of the field is less than (i.e. <) the specified value.
   */
  $lt?: T;
  /**
   * Selects the documents where the value of the field is less than or equal to (i.e. <=) the specified value.
   */
  $lte?: T;
  /**
   * Matches documents where the value of a field equals the specified value.
   */
  $eq?: T;
  /**
   * Selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.)
   */
  $gte?: T;
  /**
   * Selects those documents where the value of the field is greater than (i.e. >) the specified value.
   */
  $gt?: T;
  /**
   * Selects the documents where the value of a field equals any value in the specified array
   */
  $in?: number[];
};

export type FilterByString<T extends string = string> = {
  /**
   * Matches documents where the value of a field equals the specified value.
   */
  $eq?: T;
  /**
   * Selects the documents where the value of the field is not equal to the specified value. This does not includes documents that do not contain the field.
   */
  $ne?: T;
  /**
   * Selects the documents where the value of a field equals any value in the specified array
   */
  $in?: string[];
};

export type FilterByGeopoint = {
  /**
   * The query returns coordinate pairs that are within the bounds of the circle.
   * Specify radius in kilometers.
   */
  $center?: [point: Geopoint, radius: number];
  /**
   * The query returns pairs that are within the bounds of the polygon.
   * The last point is always implicitly connected to the first.
   */
  $polygon?: Geopoint[];
};

type Operator<T> = T extends Geopoint
  ? FilterByGeopoint
  : T extends (infer U)[]
  ? Operator<U>
  : T extends object
  ? FilterBySubQuery<T>
  : T extends boolean
  ? FilterByBoolean<T>
  : T extends number
  ? FilterByNumber<T>
  : T extends string
  ? FilterByString<T>
  : never;

export type FilterExpression<T> = {
  $and?: FilterByQuery<T>[];
  $or?: FilterByQuery<T>[];
};

export type FilterBySubQuery<T> = {
  [K in keyof T]?: Operator<T[K]>;
};

export type FilterByQuery<T> = FilterBySubQuery<T> | FilterExpression<T>;

function wrap(expr: string) {
  return expr ? '(' + expr + ')' : expr;
}

function stringify(data: unknown): string {
  switch (typeof data) {
    case 'string':
      return '`' + data.replace(/([`\\])/g, '\\$1') + '`';
    default:
      return `${data}`;
  }
}

function next(node: unknown, path: string[]): string {
  assert(node && typeof node === 'object');
  return Object.entries(node)
    .reduce<string[]>((terms, [key, value]: [string, unknown]) => {
      if (value === undefined) {
        return terms;
      }
      if (key.startsWith('$')) {
        switch (key) {
          case '$lt': {
            terms.push(`${path.join('.')}:<${stringify(value)}`);
            break;
          }
          case '$lte': {
            terms.push(`${path.join('.')}:<=${stringify(value)}`);
            break;
          }
          case '$eq': {
            terms.push(`${path.join('.')}:=${stringify(value)}`);
            break;
          }
          case '$ne': {
            terms.push(`${path.join('.')}:!=${stringify(value)}`);
            break;
          }
          case '$gte': {
            terms.push(`${path.join('.')}:>=${stringify(value)}`);
            break;
          }
          case '$gt': {
            terms.push(`${path.join('.')}:>${stringify(value)}`);
            break;
          }
          case '$in': {
            assert(Array.isArray(value));
            const sign = value.some((v) => typeof v === 'string') ? ':=' : ':';
            terms.push(`${path.join('.')}${sign}[${value.map(stringify).join(',')}]`);
            break;
          }
          case '$polygon': {
            const points = value as FilterByGeopoint['$polygon'];
            assert(points);
            terms.push(`${path.join('.')}:(${points.join(',')})`);
            break;
          }
          case '$center': {
            const expr = value as FilterByGeopoint['$center'];
            assert(expr);
            const [point, radius] = expr;
            terms.push(`${path.join('.')}:(${point.join(',')},${radius}km)`);
            break;
          }
          case '$and': {
            assert(Array.isArray(value));
            const expr = value.map((sub: unknown) => wrap(next(sub, path))).join('&&');
            if (expr) terms.push(wrap(expr));
            break;
          }
          case '$or': {
            assert(Array.isArray(value));
            const expr = value.map((sub: unknown) => wrap(next(sub, path))).join('||');
            if (expr) terms.push(wrap(expr));
            break;
          }
          default: {
            throw new Error(`Unknown operator ${key}`);
          }
        }
      } else {
        const expr = next(value, path.concat(key));
        if (expr) terms.push(expr);
      }
      return terms;
    }, [])
    .join('&&');
}

/**
 * Builds a query to filter conditions for refining your search results.
 *
 * https://typesense.org/docs/0.23.0/api/search.html#query-parameters
 */
export function buildFilterBy<T>(query: FilterByQuery<T>) {
  return next(query, []);
}
