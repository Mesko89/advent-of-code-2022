import { part1, part2 } from './index';

describe('Day 3: Binary Diagnostic', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(
        part1([
          '00100',
          '11110',
          '10110',
          '10111',
          '10101',
          '01111',
          '00111',
          '11100',
          '10000',
          '11001',
          '00010',
          '01010',
        ])
      ).toBe(198);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(
        part2([
          '00100',
          '11110',
          '10110',
          '10111',
          '10101',
          '01111',
          '00111',
          '11100',
          '10000',
          '11001',
          '00010',
          '01010',
        ])
      ).toBe(230);
    });
  });
});
