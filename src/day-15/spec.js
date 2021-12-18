import { part1, part2 } from './index';

const testInput = [
  '1163751742',
  '1381373672',
  '2136511328',
  '3694931569',
  '7463417111',
  '1319128137',
  '1359912421',
  '3125421639',
  '1293138521',
  '2311944581',
];

describe('Day 15: Chiton', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(40);
    });
  });
  describe('part2', () => {
    it('should work for test case', () => {
      expect(part2(testInput)).toBe(315);
    });
  });
});
