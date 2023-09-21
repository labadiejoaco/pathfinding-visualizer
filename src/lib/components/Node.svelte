<script>
	export let node, onMouseDown, onMouseUp, onMouseOver;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	class={`border ${node.isWall ? 'bg-gray-700' : ''} ${node.isStart ? 'bg-green-500' : ''} ${
		node.isFinish ? 'bg-red-500' : ''
	}`}
	style={`${node.isVisited ? 'background-color: rgb(118 169 250);' : ''} 
    ${node.isPath ? 'background-color: rgb(250 202 21);' : ''}
    `}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:mouseover={onMouseOver}
/>
