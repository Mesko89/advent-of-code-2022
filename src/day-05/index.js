function parseCargo(input) {
  let i = 0;
  while (!input[i].startsWith(' 1')) i++;

  const cargoPlan = input.slice(0, i).reverse();
  const [totalBays] = input[i++].match(/\d+ $/).map((v) => parseInt(v.trim()));
  const cargoBays = Array.from({ length: totalBays }).map(() => []);

  for (const plan of cargoPlan) {
    for (let i = 0; i < plan.length; i += 4) {
      const crate = plan.substring(i + 1, i + 2);
      if (crate && crate !== ' ') {
        cargoBays[i / 4].push(crate);
      }
    }
  }

  i++;

  const procedure = [];
  for (; i < input.length; i++) {
    const [_, move, from, to] = input[i]
      .match(/move (\d+) from (\d+) to (\d+)/)
      .map((v) => parseInt(v));
    procedure.push({ move, from, to });
  }

  return { cargoBays, procedure };
}

function runProcedure9000({ cargoBays, procedure }) {
  for (const move of procedure) {
    for (let i = 0; i < move.move; i++) {
      const crate = cargoBays[move.from - 1].pop();
      cargoBays[move.to - 1].push(crate);
    }
  }
  return cargoBays;
}

function runProcedure9001({ cargoBays, procedure }) {
  for (const move of procedure) {
    const crate = cargoBays[move.from - 1].slice(-move.move);
    cargoBays[move.from - 1] = cargoBays[move.from - 1].slice(0, -move.move);
    cargoBays[move.to - 1].push(...crate);
  }
  return cargoBays;
}

export function part1(input) {
  const cargoBays = runProcedure9000(parseCargo(input));
  return cargoBays.map((b) => b[b.length - 1]).join('');
}
export function part2(input) {
  const cargoBays = runProcedure9001(parseCargo(input));
  return cargoBays.map((b) => b[b.length - 1]).join('');
}
