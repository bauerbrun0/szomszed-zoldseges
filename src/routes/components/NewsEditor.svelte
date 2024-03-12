<script lang="ts">
	import { marked } from "marked";
	import DOMPurify from "dompurify";
  	import { browser } from "$app/environment";
  	import { enhance } from "$app/forms";
	import Spinner from "$lib/components/Spinner.svelte";

	let markdown =
	`# Címsor1
## Címsor2
### Címsor3
#### Címsor4
##### Címsor5
###### Címsor6

szöveg\\
**félkövér**\\
*dőlt*\\
~~áthúzott~~\\
\`kód\`
> idézet

---ez egy megjegyzés---
---
    ez is egy
    megjegyzés
---

[link](https://www.google.com)

aláhúzás
___

- felsorolás
1. számozott felsorolás

| oszlop 1 | oszlop 2 | oszlop 3 |
|-|-|-|
| adat | adat | adat |
| adat | adat | adat |

![alt kép](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)
`;

	let commentRegex = /---.*?---/gs;
	$: cleanHtml = browser ? DOMPurify.sanitize(marked(markdown.replace(commentRegex, '')) as string) : "";
	let loading = false;
</script>

<form
	method="post"
	action="?/news"
	use:enhance={() => {
		loading = true;

		return async({ update }) => {
			await update();
			markdown = "";
			loading = false;
		}
	}}
>
	<div class="card grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 h-[600px] gap-6 p-4">
		<div id="editor" class="h-full">
			<textarea
				id="markdown"
				name="markdown"
				bind:value={markdown}
				placeholder="Írd ide a hír tartalmát..."
				class="textarea h-full resize-none font-mono disabled:cursor-progress"
				spellcheck="false"
				disabled={loading}
				required
			/>
		</div>
		<div id="preview" class="h-full overflow-y-auto">
			{#if browser}
				{@html cleanHtml}
			{/if}
		</div>
	</div>
	<div class="w-full flex items-end place-content-end space-x-4">
		<button class="btn variant-ghost-primary" type="button" on:click={() => markdown = ""}>
			Törlés
		</button>
		<button
			class="btn variant-filled-primary disabled:cursor-progress flex items-center space-x-2 mt-2"
			type="submit"
			disabled={loading}
		>
			<span>Rögzítés</span>
			{#if loading}
				<Spinner />
			{/if}
		</button>
	</div>
</form>
