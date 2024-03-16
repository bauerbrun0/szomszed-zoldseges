<script lang="ts">
  	import type { News } from "$lib/db/schema";
	import type { PageData } from "./$types";
	import { marked } from "marked";

	export let data: PageData;

	let news: News = data.news;
</script>

<div
	id="preview"
	class="mx-auto 2xl:max-w-screen-2xl 2xl:min-w-screen-2xl px-2 md:px-4"
>
	{@html marked(news.content)}
</div>