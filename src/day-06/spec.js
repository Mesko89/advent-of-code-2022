import { part1, part2 } from './index';

describe('Day 6: Supply Stacks', () => {
  describe('part1', () => {
    it('should return first marker location', () => {
      expect(part1(['bvwbjplbgvbhsrlpgdmjqwftvncz'])).toBe(5);
      expect(part1(['nppdvjthqldpwncqszvftbrmjlhg'])).toBe(6);
      expect(part1(['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'])).toBe(10);
      expect(part1(['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'])).toBe(11);
    });
  });
  describe('part2', () => {
    it('should return top crates', () => {
      expect(part2(['mjqjpqmgbljsphdztnvjfqwrcgsmlb'])).toBe(19);
      expect(part2(['bvwbjplbgvbhsrlpgdmjqwftvncz'])).toBe(23);
      expect(part2(['nppdvjthqldpwncqszvftbrmjlhg'])).toBe(23);
      expect(part2(['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'])).toBe(29);
      expect(part2(['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'])).toBe(26);
    });
  });
});
