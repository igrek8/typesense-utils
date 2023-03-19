import { buildGroupBy } from './buildGroupBy';

interface Collection {
  name: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  year: number;
}

describe('buildGroupBy', () => {
  it('composes an expression', () => {
    expect(buildGroupBy<Collection>(['name', 'movies.title'])).toBe('name,movies.title');
  });
});
