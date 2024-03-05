<script lang="ts">
	import { vegetables, fruits } from "$lib/data";
	import ProductTable from "./components/ProductTable.svelte";

	$: userLoggedIn = false;
</script>

<div class="
	mx-auto 2xl:max-w-screen-2xl 2xl:min-w-screen-2xl
	px-2 md:px-4
">
	{#if userLoggedIn}
		<h3 class="h3 my-6">Raktárkészlet</h3>
		<h3 class="h3 my-6">Szupertitkos Raktárkészlet</h3>
		<h3 class="h3 my-6">Beszállítók</h3>
		<h3 class="h3 my-6">Szupertitkos Beszállítók</h3>
	{:else}
		<ProductTable products={vegetables} title="Zöldségeink" />
		<ProductTable products={fruits} title="Gyümölcseink" />
	{/if}
</div>