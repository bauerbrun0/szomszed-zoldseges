<script lang="ts">
	import { Avatar } from "@skeletonlabs/skeleton";
	import type { CustomerNeedMessage } from "$lib/types";

	export let message: CustomerNeedMessage;
	export let type: "host" | "guest";	
</script>

{#if type === "host"}
<div class="grid grid-cols-[auto_1fr] gap-2">
	<Avatar src={message.userImage} width="w-12" />
	<div class="card p-4 variant-filled-primary rounded-tl-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">{message.username}</p>
			<small class="opacity-50">{message.createdAt.toLocaleString()}</small>
		</header>
		<p>{@html message.content}</p>
	</div>
</div>
{:else}
<div class="grid grid-cols-[1fr_auto] gap-2">
	<div class="card p-4 rounded-tr-none space-y-2">
		<header class="flex justify-between items-center">
			<p class="font-bold">{message.username}</p>
			<small class="opacity-50">{message.createdAt.toLocaleString()}</small>
		</header>
		<p>{@html message.content}</p>
	</div>
	<Avatar src={message.userImage} width="w-12" />
</div>
{/if}