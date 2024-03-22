<script lang="ts">
	import "../app.css";
	import { AppShell } from "@skeletonlabs/skeleton";
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
	import { storePopup } from "@skeletonlabs/skeleton";
  	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";


	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
	<title>A Szomszéd Zöldséges</title>
	<link rel="icon" type="image/svg" href="/favicon.svg" />
</svelte:head>

<AppShell>
	<svelte:fragment slot="header"><Header/></svelte:fragment>
	
	<slot />

	<svelte:fragment slot="pageFooter"><Footer/></svelte:fragment>
</AppShell>