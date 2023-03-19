import { buildFilterBy, FilterByQuery } from './buildFilterBy';
import { Geopoint } from './Geopoint';

describe('buildFilterBy', () => {
  it('$lt', async () => {
    expect(buildFilterBy<{ year: number }>({ year: { $lt: 2023 } })).toBe('year:<2023');
  });

  it('$lte', () => {
    expect(buildFilterBy<{ year: number }>({ year: { $lte: 2023 } })).toBe('year:<=2023');
  });

  it('$eq', () => {
    expect(buildFilterBy<{ status: 'published' }>({ status: { $eq: 'published' } })).toBe('status:`published`');
    expect(buildFilterBy<{ price: number }>({ price: { $eq: 100 } })).toBe('price:100');
    expect(buildFilterBy<{ deleted: boolean }>({ deleted: { $eq: false } })).toBe('deleted:false');
  });

  it('escapes backtick', () => {
    expect(buildFilterBy<{ text: string }>({ text: { $eq: 'Sample `text`' } })).toBe('text:`Sample \\`text\\``');
  });

  it('$ne', () => {
    expect(buildFilterBy<{ status: 'published' }>({ status: { $ne: 'published' } })).toBe('status:!=`published`');
    expect(buildFilterBy<{ deleted: boolean }>({ deleted: { $ne: false } })).toBe('deleted:!=false');
  });

  it('$gte', () => {
    expect(buildFilterBy<{ year: number }>({ year: { $gte: 2023 } })).toBe('year:>=2023');
  });

  it('$gt', () => {
    expect(buildFilterBy<{ year: number }>({ year: { $gt: 2023 } })).toBe('year:>2023');
  });

  it('$in', () => {
    expect(buildFilterBy<{ years: number[] }>({ years: { $in: [2022, 2023] } })).toBe('years:[2022,2023]');
    expect(buildFilterBy<{ colors: string[] }>({ colors: { $in: ['Blue', 'Red'] } })).toBe('colors:[`Blue`,`Red`]');
    expect(buildFilterBy<{ checks: boolean[] }>({ checks: { $in: [false] } })).toBe('checks:[false]');
  });

  it('$and', () => {
    expect(
      buildFilterBy<{ year: number }>({
        $and: [
          {
            year: {
              $gte: 2000,
            },
          },
          {
            year: {
              $lte: 2020,
            },
          },
        ],
      })
    ).toBe('((year:>=2000)&&(year:<=2020))');
  });

  it('$and', () => {
    expect(
      buildFilterBy<{ year: number }>({
        $or: [
          {
            year: {
              $eq: 2020,
            },
          },
          {
            year: {
              $eq: 2021,
            },
          },
        ],
      })
    ).toBe('((year:2020)||(year:2021))');
  });

  it('uses $and by default', () => {
    expect(
      buildFilterBy<{ year: number; title: string }>({
        year: { $eq: 1995 },
        title: { $eq: 'Jumanji' },
      })
    ).toBe('year:1995&&title:`Jumanji`');
  });

  it('returns empty if no operator is used', () => {
    expect(buildFilterBy<{ year: number }>({ year: { $eq: undefined } })).toBe('');
  });

  it('captures nested path', () => {
    type Movie = { year: number };
    type Collection = { name: string; movies: Movie[] };
    expect(buildFilterBy<Collection>({ movies: { year: { $gte: 2020 } } })).toBe('movies.year:>=2020');
  });

  it('$geopoint', () => {
    expect(buildFilterBy<{ location: Geopoint }>({ location: { $center: [[40.711475, -73.998399], 1] } })).toBe(
      'location:(40.711475,-73.998399,1km)'
    );
  });

  it('$polygon', () => {
    expect(
      buildFilterBy<{ location: Geopoint }>({
        location: {
          $polygon: [
            [40.71102, -73.998905],
            [40.712, -73.998905],
            [40.712, -73.997607],
            [40.71102, -73.997607],
          ],
        },
      })
    ).toBe('location:(40.71102,-73.998905,40.712,-73.998905,40.712,-73.997607,40.71102,-73.997607)');
  });

  it('throws error on unknown operator', () => {
    type Movie = { year: number };
    expect(() => buildFilterBy({ year: { $exists: true } } as FilterByQuery<Movie>)).toThrowError('Unknown operator');
  });

  it('returns empty if no operators', () => {
    expect(buildFilterBy<{ year: number }>({})).toBe('');
  });

  it('returns empty with nested empty $and', () => {
    expect(buildFilterBy<{ year: number }>({ $and: [{ $and: [] }] })).toBe('');
  });

  it('builds a valid query', () => {
    interface Movie {
      title: string;
      year: number;
      rating: number;
      available: boolean;
    }

    interface Collection {
      title: string;
      tags?: string[];
      movies: Movie[];
    }

    expect(
      buildFilterBy<Collection>({
        movies: {
          available: {
            $eq: true,
          },
        },
        $or: [
          {
            movies: {
              year: {
                $gte: 2020,
              },
            },
            tags: {
              $in: ['horror', 'sci-fi'],
            },
          },
          {
            movies: {
              rating: {
                $gte: 4,
              },
            },
          },
        ],
      })
    ).toBe('movies.available:true&&((movies.year:>=2020&&tags:[`horror`,`sci-fi`])||(movies.rating:>=4))');
  });
});
