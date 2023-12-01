import { part1, part2 } from './index';

describe('Day 7: No Space Left On Device', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(
        part1([
          '$ cd /',
          '$ ls',
          'dir a',
          '14848514 b.txt',
          '8504156 c.dat',
          'dir d',
          '$ cd a',
          '$ ls',
          'dir e',
          '29116 f',
          '2557 g',
          '62596 h.lst',
          '$ cd e',
          '$ ls',
          '584 i',
          '$ cd ..',
          '$ cd ..',
          '$ cd d',
          '$ ls',
          '4060174 j',
          '8033020 d.log',
          '5626152 d.ext',
          '7214296 k',
        ])
      ).toBe(95437);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2([
          '$ cd /',
          '$ ls',
          'dir a',
          '14848514 b.txt',
          '8504156 c.dat',
          'dir d',
          '$ cd a',
          '$ ls',
          'dir e',
          '29116 f',
          '2557 g',
          '62596 h.lst',
          '$ cd e',
          '$ ls',
          '584 i',
          '$ cd ..',
          '$ cd ..',
          '$ cd d',
          '$ ls',
          '4060174 j',
          '8033020 d.log',
          '5626152 d.ext',
          '7214296 k',
        ])
      ).toBe(24933642);
    });
  });
});
