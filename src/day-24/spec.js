import { parse } from './index';

describe('Day 24: Arithmetic Logic Unit', () => {
  describe('ALU', () => {
    it('can negate a number', () => {
      const fn = parse(['inp x', 'mul x -1']);
      expect(fn([5]).x).toEqual(-5);
    });
    it('can check if number is three times larger', () => {
      const fn = parse(['inp z', 'inp x', 'mul z 3', 'eql z x']);
      expect(fn([5, 15]).z).toEqual(1);
      expect(fn([5, 12]).z).toEqual(0);
    });
    it('can divide', () => {
      const fn = parse(['inp x', 'inp y', 'div x y']);
      expect(fn([10, 3]).x).toEqual(3);
      expect(fn([10, -3]).x).toEqual(-3);
    });
    it('can mod', () => {
      const fn = parse(['inp x', 'inp y', 'mod x y']);
      expect(fn([10, 3]).x).toEqual(1);
    });
  });
});
