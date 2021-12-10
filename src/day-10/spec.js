import { part1, part2 } from './index';

const testInput = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]',
];

describe('Day 10: Syntax Scoring', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(part1(['(]'])).toBe(57);
      expect(part1(['{()()()>'])).toBe(25137);
      expect(part1(['(((()))}'])).toBe(1197);
      expect(part1(['<([]){()}[{}])'])).toBe(3);
    });
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(26397);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(part2(testInput)).toBe(288957);
    });
  });
});
