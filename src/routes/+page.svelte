<script lang="ts">
	export let data;

	import { page } from "$app/stores";
	import { vegetables, fruits } from "$lib/data";
	import ProductTable from "./components/ProductTable.svelte";
  	import SuppliersList from "./components/SuppliersList.svelte";
</script>

<div class="
	mx-auto 2xl:max-w-screen-2xl 2xl:min-w-screen-2xl
	px-2 md:px-4
">
	{#if $page.data.user}
		<h3 class="h3 mt-6 mb-3">Beszállítók</h3>
		<SuppliersList suppliers={data?.suppliers} />
		<h3 class="h3 mt-6 mb-3">Szupertitkos Beszállítók</h3>
		<SuppliersList suppliers={data?.secretSuppliers} emptyMessage="Csak adminisztrátorok számára elérhető." />
		<h3 class="h3 mt-6 mb-3">Vásárlói igények</h3>
		<h3 class="h3 mt-6 mb-3">Számla feltöltés</h3>
	{:else}
		<ProductTable products={vegetables} title="Zöldségeink" />
		<ProductTable products={fruits} title="Gyümölcseink" />
	{/if}
</div>