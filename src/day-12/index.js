import { arrayUnique } from '../utils/array';

function Node(nodeId) {
  return {
    nodeId,
    isLower: nodeId.toLowerCase() === nodeId,
    connections: [],
  };
}

function parseGraph(input) {
  const graph = new Map();
  for (const line of input) {
    const [from, to] = line.split('-');
    if (!graph.has(from)) {
      graph.set(from, Node(from));
    }
    if (!graph.has(to)) {
      graph.set(to, Node(to));
    }
    const fromNode = graph.get(from);
    const toNode = graph.get(to);
    fromNode.connections.push(toNode);
    toNode.connections.push(fromNode);
  }
  return graph;
}

function findPaths(graph, { startNodeId, endNodeId, canVisitTwice = false }) {
  const paths = [];
  const currentPaths = [
    {
      nodes: [graph.get(startNodeId)],
      visited: new Set([startNodeId]),
      visitedTwice: null,
    },
  ];
  while (currentPaths.length) {
    const path = currentPaths.pop();
    const lastNode = path.nodes[path.nodes.length - 1];
    if (lastNode.nodeId === endNodeId) {
      paths.push(path);
      continue;
    }
    const possibleConnections = lastNode.connections;
    for (const connection of possibleConnections) {
      if (canVisitTwice === true && connection.nodeId === startNodeId) continue;

      if (!connection.isLower || !path.visited.has(connection.nodeId)) {
        const newVisited = new Set(path.visited);
        newVisited.add(connection.nodeId);
        currentPaths.push({
          nodes: [...path.nodes, connection],
          visited: newVisited,
          visitedTwice: path.visitedTwice,
        });
      } else if (canVisitTwice === true && path.visitedTwice === null) {
        currentPaths.push({
          nodes: [...path.nodes, connection],
          visited: new Set(path.visited),
          visitedTwice: connection.nodeId,
        });
      }
    }
  }
  return paths;
}

export function part1(input) {
  const graph = parseGraph(input);
  const paths = findPaths(graph, { startNodeId: 'start', endNodeId: 'end' });
  return paths.length;
}

export function part2(input) {
  const graph = parseGraph(input);
  const paths = findPaths(graph, {
    startNodeId: 'start',
    endNodeId: 'end',
    canVisitTwice: true,
  });
  return paths.length;
}
