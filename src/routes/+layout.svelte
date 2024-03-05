<script lang="ts">
	import "../app.pcss";
	import { AppShell } from "@skeletonlabs/skeleton";
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
	import { storePopup } from "@skeletonlabs/skeleton";
  	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";


	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
	<title>A Szomszéd Zöldséges</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header"><Header/></svelte:fragment>
	
	<slot />

	<svelte:fragment slot="pageFooter"><Footer/></svelte:fragment>
</AppShell>