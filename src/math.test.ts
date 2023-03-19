import { subtract, sum } from './math';

test('sum', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(2, 3)).toBe(5);
});

test('subtract', () => {
  expect(subtract(1, 2)).toBe(-1);
  expect(subtract(2, 3)).toBe(-1);
});
