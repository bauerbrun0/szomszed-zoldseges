<script lang="ts">
  	import type { Supplier } from "$lib/types";

	export let suppliers: Supplier[] = [];
	export let emptyMessage: string = "Nincs megjeleníthető elem.";
</script>

{#if suppliers.length === 0}
	<p>{emptyMessage}</p>	
{:else}
	<dl class="card p-1">
		{#each suppliers as supplier}
			<div class="flex items-center p-2">
				<span class="badge bg-primary-500 text-xl mr-2">🚚</span>
				<div class="overflow-x-auto w-full py-3">
					<span class="w-[800px] md:w-full grid grid-cols-5 gap-2 md:gap-4">
						<dt class="font-bold">{supplier.name}</dt>
						<dd>{supplier.address}</dd>
						<dd>{supplier.person}</dd>
						<dd>{supplier.email}</dd>
						<dd>{supplier.phone}</dd>
					</span>
				</div>
			</div>
		{/each}
	</dl>
{/if}