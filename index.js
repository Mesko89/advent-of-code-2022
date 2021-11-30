#!/usr/bin/env bash
':'; //# comment; exec /usr/bin/env node --input-type=module - "$@" < "$0"

import { readdir, readFile } from 'fs/promises';

const totalDays = (await readdir('./src')).filter(d => d.startsWith('day-')).length;

async function loadInput(file) {
  const contents = await readFile(file);
  return contents.toString();
}

const days =
  process.argv.length > 2
    ? process.argv.slice(2).map((v) => v.toString().padStart(2, '0'))
    : Array.from({ length: totalDays }).map((_, i) =>
        (i + 1).toString().padStart(2, '0')
      );

try {
  const inputs = await Promise.all(
    days.map(async (d) => {
      return (await loadInput(`./src/day-${d}/input.txt`))
        .split(/[\r\n]/)
        .filter((r, i, arr) => i !== arr.length - 1 || Boolean(r));
    })
  );
  const parts = days.map((d) => import(`./src/day-${d}/index.js`));
  for (let i = 0; i < parts.length; i++) {
    console.log(`Solutions for day "${days[i]}":`);
    const { part1, part2 } = await parts[i];
    const p1Start = Date.now();
    const p1Solution = await part1(inputs[i]);
    console.log(`  Part 1: ${p1Solution} (${Date.now() - p1Start} ms)`);
    const p2Start = Date.now();
    const p2Solution = await part2(inputs[i]);
    console.log(`  Part 2: ${p2Solution} (${Date.now() - p2Start} ms)`);
  }
} catch (ex) {
  console.error(ex);
}
