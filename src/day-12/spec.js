import { part1, part2 } from './index';

const testInput = [
  'fs-end',
  'he-DX',
  'fs-he',
  'start-DX',
  'pj-DX',
  'end-zg',
  'zg-sl',
  'zg-pj',
  'pj-he',
  'RW-he',
  'fs-DX',
  'pj-RW',
  'zg-RW',
  'start-pj',
  'he-WI',
  'zg-he',
  'pj-fs',
  'start-RW',
];

describe('Day 12: Passage Pathing', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(
        part1(['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'])
      ).toBe(10);
    });
    it('should work for simple case #2', () => {
      expect(
        part1([
          'dc-end',
          'HN-start',
          'start-kj',
          'dc-start',
          'dc-HN',
          'LN-dc',
          'HN-end',
          'kj-sa',
          'kj-HN',
          'kj-dc',
        ])
      ).toBe(19);
    });
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(226);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(
        part2(['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'])
      ).toBe(36);
    });
    it('should work for simple case #2', () => {
      expect(
        part2([
          'dc-end',
          'HN-start',
          'start-kj',
          'dc-start',
          'dc-HN',
          'LN-dc',
          'HN-end',
          'kj-sa',
          'kj-HN',
          'kj-dc',
        ])
      ).toBe(103);
    });
  });
});
