export function arrayMax(arr, fn = (d) => d) {
  if (arr.length === 0) return undefined;
  let max = fn(arr[0]);
  for (let i = 0; i < arr.length; i++) {
    const v = fn(arr[i]);
    if (v > max) {
      max = v;
    }
  }
  return max;
}

export function arrayFlat(arr) {
  return arr.reduce((newArray, [...items]) => [...newArray, ...items], []);
}

export function arrayUnique(arr) {
  return Array.from(new Set(arr));
}
