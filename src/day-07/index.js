function Node(name, isFile, parent = null) {
  return {
    name,
    isFile: isFile,
    size: 0,
    files: [],
    dirs: [],
    parent,
  };
}

function addFileSizeToDirTree(dir, size) {
  if (dir === null) return;
  dir.size += size;
  addFileSizeToDirTree(dir.parent, size);
}

function addFile(name, size, dir) {
  const file = Node(name, true, dir);
  file.size = size;
  dir.files.push(file);
  addFileSizeToDirTree(dir, size);
}

function parseDataStorage(input) {
  const root = Node('/', false);
  let currentDir = null;
  let i = 0;
  while (input[i]) {
    const command = input[i].substring(2, 4);
    const arg = input[i].substring(5);
    switch (command) {
      case 'cd':
        if (arg === '/') {
          currentDir = root;
        } else if (arg === '..') {
          currentDir = currentDir.parent;
        } else {
          let newDir = currentDir.dirs.find((d) => d.name === arg);
          if (!newDir) {
            newDir = Node(arg, false, currentDir);
            currentDir.directories.push(newDir);
          }
          currentDir = newDir;
        }
        i++;
        break;
      case 'ls':
        i++;
        while (input[i] && input[i][0] !== '$') {
          if (input[i].startsWith('dir')) {
            const newDir = Node(input[i].substring(4), false, currentDir);
            currentDir.dirs.push(newDir);
          } else {
            const [_, sizeMatch, name] = input[i].match(/^(\d+) (.+)$/);
            addFile(name, parseInt(sizeMatch), currentDir);
          }
          i++;
        }
        break;
    }
  }
  return root;
}

export function part1(input) {
  const diskRoot = parseDataStorage(input);
  let totalSize = 0;
  (function loop(dir) {
    if (dir.size <= 100000) {
      totalSize += dir.size;
    }
    dir.dirs.forEach((dir) => loop(dir));
  })(diskRoot);
  return totalSize;
}
export function part2(input) {
  const diskRoot = parseDataStorage(input);
  let needToClear = 30000000 - (70000000 - diskRoot.size);
  let smallest = Number.POSITIVE_INFINITY;
  (function loop(dir) {
    if (dir.size > needToClear && dir.size < smallest) {
      smallest = dir.size;
    }
    dir.dirs.forEach((dir) => loop(dir));
  })(diskRoot);
  return smallest;
}
