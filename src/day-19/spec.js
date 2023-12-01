import { part1, part2 } from './index';

describe('Day 19: Not Enough Minerals', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(
        part1([
          'Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.',
          'Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.',
        ])
      ).toBe(33);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2([
          'Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.',
          'Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.',
        ])
      ).toBe(56 * 62);
    });
  });
});
