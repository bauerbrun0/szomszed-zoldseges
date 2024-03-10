<script lang="ts">
	import type { CustomerNeedMessage as TCustomerNeedMessage } from "$lib/types";
  	import CustomerNeedMessage from "./CustomerNeedMessage.svelte";
	import { enhance } from "$app/forms";
  	import { browser } from "$app/environment";
  	import { onMount } from "svelte";

	export let customerNeedMessages : TCustomerNeedMessage[];
	export let username: string;

	let newMessage = "";
	let messagesDiv: HTMLDivElement;

	// Scroll to bottom on, so the latest message is visible
	onMount(() => {
		if (messagesDiv) {
			messagesDiv.scrollTop = messagesDiv.scrollHeight;
		}
	});

	// scrolling to bottom when new message is added, ie when customerNeedMessages changes
	$: if (customerNeedMessages && browser) {
		// setTimeout is needed to wait for the DOM to update
		setTimeout(() => messagesDiv.scrollTo({
			top: messagesDiv.scrollHeight,
			left: 0,
			behavior: "smooth"
		}), 0);
	}

</script>

<div
	class="
		card variant-ghost-primary p-3 md:p-5
		flex flex-col space-y-2 md:space-y-4
		max-h-[calc(100dvh-57px)] md:max-h-[600px]
		overflow-y-auto
	"
	bind:this={messagesDiv}
>
	{#each customerNeedMessages as message}
		<CustomerNeedMessage {message} type={message.username === username ? "host" : "guest"} />
	{/each}
</div>
<!-- Form to submit new messages -->
<form
	class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token mt-2 md:mt-4"
	method="post"
	action="?/message"
	use:enhance={() => {
		return async({ update }) => {
			await update();
			newMessage = "";
		}
	}}
>
	<textarea
		class="bg-transparent border-0 ring-0"
		name="content"
		id="content"
		placeholder="Írd ide a vásárlói igényeket, véleményeket..."
		rows="1"
		required
		spellcheck="false"
		autocapitalize="off"
		bind:value={newMessage}
	/>
	<button type="submit" class="variant-filled-primary">Rögzítés</button>
</form>
					