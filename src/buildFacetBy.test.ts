import { buildFacetBy } from './buildFacetBy';

interface Collection {
  name: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  year: number;
}

describe('buildFacetBy', () => {
  it('composes an expression', () => {
    expect(buildFacetBy<Collection>(['name', 'movies.title'])).toBe('name,movies.title');
  });
});
