<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="container mt-12">
	{@render children()}
</div>
