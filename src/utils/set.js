export function intersection(a, b) {
  const r = new Set();
  for (const v of a) {
    if (b.has(v)) {
      r.add(v);
    }
  }
  return r;
}
