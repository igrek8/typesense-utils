import { buildVectorQuery } from './buildVectorQuery';

interface Document {
  vec: number[];
}

describe('buildVectorQuery', () => {
  it('composes a query f the nearest neighbor vector search', () => {
    expect(buildVectorQuery<Document>('vec', [0.96826, 0.94, 0.39557, 0.306488])).toBe(
      'vec:([0.96826,0.94,0.39557,0.306488])'
    );
  });

  it('composes a query for searching for similar documents', () => {
    expect(buildVectorQuery<Document>('vec', 'foobar')).toBe('vec:([],id:foobar)');
  });

  it('composes a query for searching for similar documents', () => {
    expect(buildVectorQuery<Document>('vec', 'foobar')).toBe('vec:([],id:foobar)');
  });

  it('composes a query for a brute-force searching', () => {
    expect(
      buildVectorQuery<Document>('vec', [0.96826, 0.94, 0.39557, 0.306488], {
        $k: 100,
        $flat_search_cutoff: 20,
      })
    ).toBe('vec:([0.96826,0.94,0.39557,0.306488],k:100,flat_search_cutoff:20)');
  });
});
