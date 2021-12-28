import { part1 } from './index';

const testInput = [
  'v...>>.vv>',
  '.vv>>.vv..',
  '>>.>v>...v',
  '>>v>>.>.v.',
  'v>v.vv.v..',
  '>.>>..v...',
  '.vv..>.>v.',
  'v.v..>>v.v',
  '....v..v.>',
];

describe('Day 25: Sea Cucumber', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(58);
    });
  });
});
