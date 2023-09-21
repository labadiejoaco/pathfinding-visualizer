<script>
	import { grid } from '../../store';
	import Node from './Node.svelte';

	export let rows, columns;

	let drawing = false;

	const handleMouseDown = (row, col) => {
		drawing = true;

		setWallAtribute(row, col);
	};

	const handleMouseUp = () => {
		drawing = false;
	};

	const handleMouseOver = (row, col) => {
		if (drawing) {
			setWallAtribute(row, col);
		}
	};

	const setWallAtribute = (row, col) => {
		if (!drawing || $grid[row][col].isStart || $grid[row][col].isFinish) return;

		if ($grid[row][col].isWall) {
			$grid[row][col].isWall = false;
		} else {
			$grid[row][col].isWall = true;
		}
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="grid select-none"
	style={`grid-template-rows: repeat(${rows}, 25px); grid-template-columns: repeat(${columns}, 25px);`}
	on:mousedown={() => (drawing = true)}
	on:mouseup={() => (drawing = false)}
>
	{#each $grid as row}
		{#each row as node}
			<Node
				{node}
				onMouseDown={() => handleMouseDown(node.row, node.col)}
				onMouseUp={() => handleMouseUp()}
				onMouseOver={() => handleMouseOver(node.row, node.col)}
			/>
		{/each}
	{/each}
</div>
