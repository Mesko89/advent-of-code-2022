import { part1, part2 } from './index';

const testInput = [
  '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#',
  '',
  '#..#.',
  '#....',
  '##..#',
  '..#..',
  '..###',
];

describe('Day 20: Trench Map', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(35);
    });
  });
  describe('part2', () => {
    it('should work for test case', () => {
      expect(part2(testInput)).toBe(3351);
    });
  });
});
