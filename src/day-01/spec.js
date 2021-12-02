import { part1, part2 } from './index';

describe('Day 1: Sonar Sweep', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(
        part1([
          '199',
          '200',
          '208',
          '210',
          '200',
          '207',
          '240',
          '269',
          '260',
          '263',
        ])
      ).toBe(7);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(
        part2([
          '199',
          '200',
          '208',
          '210',
          '200',
          '207',
          '240',
          '269',
          '260',
          '263',
        ])
      ).toBe(5);
    });
  });
});
