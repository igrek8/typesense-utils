import { buildQueryBy } from './buildQueryBy';

interface Museum {
  name: string;
  tours: Tour[];
}

interface Tour {
  starts_at: number;
  language: string;
}

describe('buildQueryBy', () => {
  it('composes an expression', () => {
    expect(buildQueryBy<Museum>(['name', 'tours.language'])).toEqual('name,tours.language');
  });
});
