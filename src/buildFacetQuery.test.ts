import { buildFacetQuery } from './buildFacetQuery';

interface Collection {
  name: string;
  movies: Movie[];
}

interface Movie {
  title: string;
  year: number;
}

describe('buildFacetQuery', () => {
  it('composes an expression', () => {
    expect(
      buildFacetQuery<Collection>({
        movies: {
          title: {
            $eq: 'Jumanji',
          },
        },
      })
    ).toBe('movies.title:`Jumanji`');
  });
});
