<script lang="ts">
  	import { browser } from "$app/environment";
	import type { News } from "$lib/db/schema";
  	import { onMount } from "svelte";
	import PDFIcon from "$lib/components/icons/PDF.svelte"

	export let news: News[] = [];
	export let isLoggedIn = false;

	let newsDiv: HTMLDivElement;

	// Scroll to bottom on, so the latest message is visible
	onMount(() => {
		if (newsDiv) {
			newsDiv.scrollTop = newsDiv.scrollHeight;
		}
	});

	// scrolling to bottom when new message is added, ie when customerNeedMessages changes
	$: if (news && browser) {
		// setTimeout is needed to wait for the DOM to update
		setTimeout(() => newsDiv.scrollTo({
			top: newsDiv.scrollHeight,
			left: 0,
			behavior: "smooth"
		}), 0);
	}
</script>

<div
	class="card p-3 max-h-[300px] overflow-y-auto"
	bind:this={newsDiv}
>
	{#if news.length === 0}
		<p>Nincs megjeleníthető hír.</p>
	{:else}
		<dl class="list-dl">
		{#each news as { id, name }}
			<div>
				<span class="badge bg-primary-500 text-xl mr-2">📰</span>
				<span class="flex-auto">
					<a class="font-bold hover:underline" href={`/news/${id}`} >{name}</a>
					{#if isLoggedIn}
						<a class="hover:underline flex items-center" href={`/news/pdf/${id}`} target="_blank">
							<PDFIcon className="w-4 h-4 mr-1"/>
							{id}.pdf
						</a>
					{/if}
				</span>
			</div>
		{/each}
		</dl>
	{/if}
</div>