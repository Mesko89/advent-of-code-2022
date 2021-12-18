function toBinary(value) {
  return value
    .split('')
    .map((v) => parseInt(v, 16).toString(2).padStart(4, '0'))
    .join('');
}

export function parse(value, isBinary = false) {
  if (!isBinary) {
    value = toBinary(value);
  }
  const stack = [];
  const packets = [];
  for (let i = 0; i < value.length; ) {
    while (
      stack[stack.length - 1] &&
      stack[stack.length - 1].totalSubPackets ===
        stack[stack.length - 1].packets.length
    ) {
      stack.pop();
    }
    if (
      value
        .substring(i)
        .split('')
        .every((v) => v === '0')
    ) {
      break;
    }

    const version = parseInt(value.substring(i, i + 3), 2);
    i += 3;
    const type = parseInt(value.substring(i, i + 3), 2);
    i += 3;
    if (type === 4) {
      let numberPart = value.substring(i, i + 5);
      let number = '';
      while (numberPart[0] === '1') {
        number += numberPart.substring(1);
        i += 5;
        numberPart = value.substring(i, i + 5);
      }
      number += numberPart.substring(1);
      i += 5;
      if (stack[stack.length - 1]) {
        stack[stack.length - 1].packets.push({
          version,
          type,
          number: parseInt(number, 2),
        });
      } else {
        packets.push({ version, type, number: parseInt(number, 2) });
      }
    } else {
      const lengthType = parseInt(value.substring(i, i + 1), 2);
      i += 1;
      if (lengthType === 0) {
        const totalBits = parseInt(value.substring(i, i + 15), 2);
        i += 15;
        const subpackets = parse(value.substring(i, i + totalBits), true);
        i += totalBits;
        const packet = {
          version,
          type,
          lengthType,
          totalSubPackets: subpackets.length,
          packets: subpackets,
        };
        if (stack[stack.length - 1]) {
          stack[stack.length - 1].packets.push(packet);
        } else {
          packets.push(packet);
        }
      } else {
        const totalSubPackets = parseInt(value.substring(i, i + 11), 2);
        i += 11;
        const packet = {
          version,
          type,
          lengthType,
          totalSubPackets,
          packets: [],
        };
        if (stack[stack.length - 1]) {
          stack[stack.length - 1].packets.push(packet);
        } else {
          packets.push(packet);
        }
        stack.push(packet);
      }
    }
  }
  return packets;
}

function countVersions(packets) {
  return packets.reduce((total, packet) => {
    total += packet.version;
    if (packet.packets) {
      total += countVersions(packet.packets);
    }
    return total;
  }, 0);
}

function evaluate(packet) {
  switch (packet.type) {
    case 0:
      return packet.packets.reduce(
        (total, packet) => total + evaluate(packet),
        0
      );
    case 1:
      return packet.packets.reduce(
        (total, packet) => total * evaluate(packet),
        1
      );
    case 2:
      return Math.min(...packet.packets.map((packet) => evaluate(packet)));
    case 3:
      return Math.max(...packet.packets.map((packet) => evaluate(packet)));
    case 4:
      return packet.number;
    case 5:
      return evaluate(packet.packets[0]) > evaluate(packet.packets[1]) ? 1 : 0;
    case 6:
      return evaluate(packet.packets[0]) < evaluate(packet.packets[1]) ? 1 : 0;
    case 7:
      return evaluate(packet.packets[0]) === evaluate(packet.packets[1])
        ? 1
        : 0;
  }
}

export function part1(input) {
  const packets = parse(input[0]);
  return countVersions(packets);
}

export function part2(input) {
  const packets = parse(input[0]);
  // We only have 1 root packet
  return evaluate(packets[0]);
}
