import { part1, part2 } from './index';

const testInput = [
  '#############',
  '#...........#',
  '###B#C#B#D###',
  '  #A#D#C#A#',
  '  #########',
];

describe('Day 23: Amphipod', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(12521);
    });
  });
  xdescribe('part2', () => {
    it('should work for test case', () => {
      expect(part2(testInput)).toBe(44169);
    });
  });
});
