import { part1, part2, parse } from './index';

describe('Day 16: Packet Decoder', () => {
  describe('decoder', () => {
    it('can parse numbers', () => {
      expect(parse('D2FE28')).toEqual([{ version: 6, type: 4, number: 2021 }]);
    });
    it('can parse operator with lengthType=0', () => {
      expect(parse('38006F45291200')).toEqual([
        {
          version: 1,
          type: 6,
          lengthType: 0,
          totalSubPackets: 2,
          packets: [
            {
              version: 6,
              type: 4,
              number: 10,
            },
            {
              version: 2,
              type: 4,
              number: 20,
            },
          ],
        },
      ]);
    });
    it('can parse operator with lengthType=1', () => {
      expect(parse('EE00D40C823060')).toEqual([
        {
          version: 7,
          type: 3,
          lengthType: 1,
          totalSubPackets: 3,
          packets: [
            {
              version: 2,
              type: 4,
              number: 1,
            },
            {
              version: 4,
              type: 4,
              number: 2,
            },
            {
              version: 1,
              type: 4,
              number: 3,
            },
          ],
        },
      ]);
    });
  });
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(['8A004A801A8002F478'])).toBe(16);
      expect(part1(['620080001611562C8802118E34'])).toBe(12);
      expect(part1(['C0015000016115A2E0802F182340'])).toBe(23);
      expect(part1(['A0016C880162017C3686B18A3D4780'])).toBe(31);
    });
  });
  describe('part2', () => {
    it('should work for test case', () => {
      expect(part2(['C200B40A82'])).toBe(3);
      expect(part2(['04005AC33890'])).toBe(54);
      expect(part2(['880086C3E88112'])).toBe(7);
      expect(part2(['CE00C43D881120'])).toBe(9);
      expect(part2(['D8005AC2A8F0'])).toBe(1);
      expect(part2(['F600BC2D8F'])).toBe(0);
      expect(part2(['9C005AC2F8F0'])).toBe(0);
      expect(part2(['9C0141080250320F1802104A08'])).toBe(1);
    });
  });
});
