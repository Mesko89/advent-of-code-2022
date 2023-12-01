const MONKEY_RX = /Monkey (\d+):/;
const STARTING_ITEMS_RX = /Starting items: (.*)$/;
const OPERATION_RX = /Operation: new = (.*)$/;
const TEST_RX = /Test: divisible by (\d+)/;
const TEST_RESULT_RX = /If (?:true|false): throw to monkey (\d+)/;

function parseMonkeys(input) {
  const monkeys = [];
  let currentMonkey = null;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    if (line.startsWith('Monkey')) {
      if (currentMonkey) {
        monkeys.push(currentMonkey);
      }
      const [_, monkeyIdString] = line.match(MONKEY_RX);
      currentMonkey = {
        index: parseInt(monkeyIdString),
        inspectedCount: 0,
      };
    } else if (STARTING_ITEMS_RX.test(line)) {
      const [_, startingItems] = line.match(STARTING_ITEMS_RX);
      const items = startingItems.split(',').map((v) => parseInt(v.trim()));
      currentMonkey.items = items;
    } else if (OPERATION_RX.test(line)) {
      const [_, operation] = line.match(OPERATION_RX);
      currentMonkey.operation = new Function('old', `return ${operation}`);
    } else if (TEST_RX.test(line)) {
      const [, divisibleBy] = line.match(TEST_RX).map((v) => parseInt(v));
      const [, ifTrueThrowTo] = input[i + 1]
        .match(TEST_RESULT_RX)
        .map((v) => parseInt(v));
      const [, ifFalseThrowTo] = input[i + 2]
        .match(TEST_RESULT_RX)
        .map((v) => parseInt(v));
      currentMonkey.divisibleBy = divisibleBy;
      currentMonkey.ifTrueThrowTo = ifTrueThrowTo;
      currentMonkey.ifFalseThrowTo = ifFalseThrowTo;
    }
  }
  monkeys.push(currentMonkey);
  return monkeys;
}

function simulateRounds(monkeys, totalRounds) {
  for (let round = 0; round < totalRounds; round++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        monkey.inspectedCount++;
        let newItem = monkey.operation(item);
        newItem = Math.floor(newItem / 3);
        const isTrue = newItem % monkey.divisibleBy === 0;
        if (isTrue) {
          monkeys[monkey.ifTrueThrowTo].items.push(newItem);
        } else {
          monkeys[monkey.ifFalseThrowTo].items.push(newItem);
        }
      }
      monkey.items = [];
    }
  }
}

function simulateRoundsWithNoWorries(monkeys, totalRounds) {
  const totalMod = monkeys.reduce((m, monkey) => m * monkey.divisibleBy, 1);
  for (let round = 0; round < totalRounds; round++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        monkey.inspectedCount++;
        let newItem = monkey.operation(item) % totalMod;
        if (newItem % monkey.divisibleBy === 0) {
          monkeys[monkey.ifTrueThrowTo].items.push(newItem);
        } else {
          monkeys[monkey.ifFalseThrowTo].items.push(newItem);
        }
      }
      monkey.items = [];
    }
  }
}

export function part1(input) {
  const monkeys = parseMonkeys(input);
  simulateRounds(monkeys, 20);
  const [monkeyA, monkeyB] = monkeys
    .sort((a, b) => a.inspectedCount - b.inspectedCount)
    .slice(-2);
  return monkeyA.inspectedCount * monkeyB.inspectedCount;
}
export function part2(input) {
  const monkeys = parseMonkeys(input);
  simulateRoundsWithNoWorries(monkeys, 10000);
  const [monkeyA, monkeyB] = monkeys
    .sort((a, b) => a.inspectedCount - b.inspectedCount)
    .slice(-2);
  return monkeyA.inspectedCount * monkeyB.inspectedCount;
}
