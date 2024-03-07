<script lang="ts">
	import Logo from "$lib/components/Logo.svelte";
	import Avatar from "$lib/components/icons/Avatar.svelte";
  	import { popup, type PopupSettings} from "@skeletonlabs/skeleton";
	import ProfilePopup from "./ProfilePopup.svelte";
	import { page } from "$app/stores";

	const popupProfile: PopupSettings = {
		event: "click",
		target: "popupProfile",
		placement: "bottom-end",
	};

	let username = $page.data.user?.username;
</script>

<header class="bg-surface-100">
	<div
		class="
			flex items-center
			mx-auto 2xl:max-w-screen-2xl 2xl:min-w-screen-2xl
			p-2 md:p-4
		"
	>
		<a href="/" class="mr-4">
			<Logo className="w-10 h-10 md:w-12 md:h-12"/>
		</a>
		<a href="/">
			<h1 class="h3 md:h2">A Szomszéd Zöldséges</h1>
		</a>
		<div class="ml-auto flex items-center space-x-3 md:space-x-4 font-bold">
			{#if $page.data.user}
				<button
					type="button"
					class="flex items-center rounded-full hover:bg-primary-600 pl-2 py-0.5"
					use:popup={popupProfile}
				>
					{username}
					<Avatar className="w-8 h-8 md:w-9 md:h-9 ml-2"/>
				</button>
			{/if}
		</div>
	</div>
</header>

<ProfilePopup/>