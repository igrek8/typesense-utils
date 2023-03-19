import { buildFieldsList } from './buildFieldsList';

interface Collection {
  name: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  year: number;
}

describe('buildFieldsList', () => {
  it('composes an expression', () => {
    expect(buildFieldsList<Collection>(['name', 'movies.title'])).toBe('name,movies.title');
  });
});
