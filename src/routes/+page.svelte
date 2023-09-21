<script>
	import { dijkstra, getNodesInShortestPathOrder } from '$lib/algorithms/dijkstra';
	import github from '$lib/assets/github.svg';
	import Grid from '$lib/components/Grid.svelte';
	import { Button, Select } from 'flowbite-svelte';
	import cloneDeep from 'lodash/cloneDeep';
	import { onMount } from 'svelte';
	import { grid } from '../store';

	const ROWS = 30;
	const COLUMNS = 50;

	const START_NODE_ROW = 2;
	const START_NODE_COL = 2;
	const FINISH_NODE_ROW = 27;
	const FINISH_NODE_COL = 47;

	const ALGORITHMS = [{ value: 'dj', name: "Dijkstra's Algorithm" }];

	let selectedAlgorithm;

	const initializeGrid = () => {
		for (let row = 0; row < ROWS; row++) {
			const currentRow = [];

			for (let col = 0; col < COLUMNS; col++) {
				const newNode = {
					col,
					row,
					distance: Infinity,
					isWall: false,
					isVisited: false,
					isStart: false,
					isFinish: false,
					previousNode: null
				};

				if (row === START_NODE_ROW && col === START_NODE_COL) {
					newNode.isStart = true;
				} else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
					newNode.isFinish = true;
				}

				currentRow.push(newNode);
			}

			$grid = [...$grid, currentRow];
		}
	};

	const getVisitedNodes = () => {
		if (!selectedAlgorithm) return;

		const newGrid = cloneDeep($grid);

		if (selectedAlgorithm === 'dj') {
			const visitedNodes = dijkstra(newGrid);

			animateDijkstra(visitedNodes.slice(1));
		}
	};

	const animateDijkstra = (visitedNodes) => {
		if (visitedNodes.length === 1) {
			if (visitedNodes[0].isFinish) {
				const shortestPath = getNodesInShortestPathOrder(visitedNodes[0]);

				animateShortestPath(shortestPath.slice(1, shortestPath.length - 1));

				return;
			}

			$grid[visitedNodes[0].row][visitedNodes[0].col].isVisited = visitedNodes[0].isVisited;
			$grid = [...$grid];

			return;
		}

		const node = visitedNodes[0];

		setTimeout(() => {
			$grid[node.row][node.col].isVisited = node.isVisited;
			$grid = [...$grid];

			animateDijkstra(visitedNodes.slice(1));
		}, 5);
	};

	const animateShortestPath = (shortestPath) => {
		if (shortestPath.length === 0) {
			return;
		}

		const node = shortestPath[0];

		setTimeout(() => {
			$grid[node.row][node.col].isPath = true;
			$grid = [...$grid];

			animateShortestPath(shortestPath.slice(1));
		}, 15);
	};

	onMount(() => {
		initializeGrid();
	});
</script>

<main class="h-screen flex flex-col">
	<header class="text-center bg-gray-100 flex justify-between border-b border-gray-300 p-4">
		<div class="flex space-x-8 items-center justify-center">
			<h1 class="text-xl">Pathfinding Visualizer</h1>
			<form on:submit={getVisitedNodes} class="flex items-center space-x-2">
				<Select
					bind:value={selectedAlgorithm}
					placeholder="Algorithms"
					items={ALGORITHMS}
					required
				/>
				<!-- <Select placeholder="Mazes & Patterns" /> -->
				<Button type="submit">Visualize</Button>
			</form>
		</div>
		<div class="flex items-center justify-center">
			<a href="https://github.com/labadiejoaco/pathfinding-visualizer" target="_blank">
				<img src={github} alt="Github" class="h-8 w-8 min-h-[8] min-w-[8]" />
			</a>
		</div>
	</header>
	<div class="flex-1 flex items-center justify-center">
		<Grid rows={ROWS} columns={COLUMNS} />
	</div>
</main>
