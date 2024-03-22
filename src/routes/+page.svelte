<script lang="ts">
	import { page } from "$app/stores";
	import { vegetables, fruits } from "$lib/data";
  	import CustomerNeedMessages from "./components/CustomerNeedMessages.svelte";
  	import News from "./components/News.svelte";
  	import NewsEditor from "./components/NewsEditor.svelte";
	import ProductTable from "./components/ProductTable.svelte";
  	import SuppliersList from "./components/SuppliersList.svelte";

	export let data;
</script>

<div class="
	mx-auto 2xl:max-w-screen-2xl 2xl:min-w-screen-2xl
	px-2 md:px-4
">
	{#if $page.data.user}
		<h3 class="h3 mt-6 mb-3">Beszállítók</h3>
		<SuppliersList suppliers={data?.suppliers} />
		<h3 class="h3 mt-6 mb-3">Szupertitkos Beszállítók</h3>
		<SuppliersList suppliers={data?.secretSuppliers} />
		<h3 class="h3 mt-6 mb-3">Vásárlói igények/vélemények rögzítése</h3>
		<CustomerNeedMessages username={$page.data.user.username} customerNeedMessages={data?.customerNeedMessages || []} />
		<h3 class="h3 mt-6 mb-3">Hírek</h3>
		<News news={data?.news} isLoggedIn={true} />
		<h4 class="h4 mt-6 mb-3">Új hír rögzítése</h4>
		{#if $page.data.user.isAdmin === false}
			<p>Csak adminisztrátorok számára elérhető.</p>
		{:else}
			<NewsEditor />
		{/if}
	{:else}
		<ProductTable products={vegetables} title="Zöldségeink" />
		<ProductTable products={fruits} title="Gyümölcseink" />
		<h3 class="h3 mt-6 mb-3">Hírek</h3>
		<News news={data?.news} isLoggedIn={false} />
	{/if}
</div>