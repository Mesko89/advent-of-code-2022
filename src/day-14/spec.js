import { part1, part2 } from './index';

const testInput = [
  'NNCB',
  '',
  'CH -> B',
  'HH -> N',
  'CB -> H',
  'NH -> C',
  'HB -> C',
  'HC -> B',
  'HN -> C',
  'NN -> C',
  'BH -> H',
  'NC -> B',
  'NB -> B',
  'BN -> B',
  'BB -> N',
  'BC -> B',
  'CC -> N',
  'CN -> C',
];

describe('Day 14: Extended Polymerization', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(1588);
    });
  });
});
