import { buildSortBy, NullOrder, Order } from './buildSortBy';
import { Geopoint } from './Geopoint';

describe('buildSortBy', () => {
  it('sorts by field', () => {
    expect(
      buildSortBy<{ title: string; price: number }>({
        title: {
          $order: Order.Asc,
          $null: NullOrder.First,
        },
        price: {
          $order: Order.Desc,
          $null: NullOrder.Last,
        },
      })
    ).toBe('title(missing_values:first):asc,price(missing_values:last):desc');
  });

  it('sorts by _text_match with buckets', () => {
    expect(
      buildSortBy<{ weighted_score: number }>({
        _text_match: {
          $order: Order.Desc,
          $buckets: 10,
        },
        weighted_score: {
          $order: Order.Desc,
        },
      })
    ).toBe('_text_match(buckets:10):desc,weighted_score:desc');
  });

  it('sorts by geopoint', () => {
    expect(
      buildSortBy<{ location: Geopoint }>({
        location: {
          $point: [40.711475, -73.998399],
          $order: Order.Asc,
        },
      })
    ).toBe('location(40.711475,-73.998399):asc');
  });

  it('sorts by geopoint with precision', () => {
    expect(
      buildSortBy<{ location: Geopoint }>({
        location: {
          $point: [40.711475, -73.998399],
          $order: Order.Desc,
          $precision: 1,
        },
      })
    ).toBe('location(40.711475,-73.998399,precision:1km):desc');
  });

  it('sorts by geopoint with excluded radius', () => {
    expect(
      buildSortBy<{ location: Geopoint }>({
        location: {
          $point: [40.711475, -73.998399],
          $order: Order.Desc,
          $exclude_radius: 1,
        },
      })
    ).toBe('location(40.711475,-73.998399,exclude_radius:1km):desc');
  });

  it('sorts by condition', () => {
    expect(
      buildSortBy<{ title: string; available: boolean }>({
        _eval: [
          {
            $expr: {
              title: {
                $eq: 'The Witcher',
              },
            },
            $order: Order.Asc,
          },
          {
            $expr: {
              available: {
                $eq: true,
              },
            },
            $order: Order.Desc,
          },
        ],
      })
    ).toBe('_eval(title:=`The Witcher`):asc,_eval(available:=true):desc');
  });
});
