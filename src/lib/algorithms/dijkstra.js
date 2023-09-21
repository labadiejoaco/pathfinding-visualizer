import { getNodes } from '../utils/getNodes';

export function dijkstra(grid) {
	const unvisitedNodes = getNodes(grid);
	const visitedNodesInOrder = [];

	const startNode = unvisitedNodes.find(({ isStart }) => isStart === true);
	const finishNode = unvisitedNodes.find(({ isFinish }) => isFinish === true);

	startNode.distance = 0;

	sortNodesByDistance(unvisitedNodes);

	while (unvisitedNodes.length) {
		sortNodesByDistance(unvisitedNodes);

		const closestNode = unvisitedNodes.shift();

		if (closestNode.isWall) continue;

		if (closestNode.distance === Infinity) return visitedNodesInOrder;

		closestNode.isVisited = true;

		visitedNodesInOrder.push(closestNode);

		if (closestNode === finishNode) {
			return visitedNodesInOrder;
		}

		updateNeighbors(closestNode, grid);
	}
}

function sortNodesByDistance(unvisitedNodes) {
	unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

function updateNeighbors(node, grid) {
	const neighbors = getNeighbors(node, grid);

	for (const neighbor of neighbors) {
		neighbor.distance = node.distance + 1;
		neighbor.previousNode = node;
	}
}

function getNeighbors(node, grid) {
	const neighbors = [];

	const { col, row } = node;

	if (row > 0) neighbors.push(grid[row - 1][col]);
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

	if (col > 0) neighbors.push(grid[row][col - 1]);
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

	return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode) {
	const nodesInShortestPathOrder = [];

	let currentNode = finishNode;

	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode);
		currentNode = currentNode.previousNode;
	}

	return nodesInShortestPathOrder;
}
