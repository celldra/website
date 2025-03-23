<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	export let text: string;
	export let tooltipText: string = 'Copy to clipboard';

	function copy() {
		navigator.clipboard.writeText(text);
		tooltipText = 'Copied to clipboard!';

		setTimeout(() => {
			tooltipText = 'Copy to clipboard';
		}, 2000);
	}
</script>

<Tooltip.Provider delayDuration={0}>
	<Tooltip.Root>
		<Tooltip.Trigger class="font-mono" onclick={copy}>
			{text}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{tooltipText}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
