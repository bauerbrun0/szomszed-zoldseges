<script lang="ts">
	import { page } from "$app/stores";

	let username = $page.data.user?.username;
</script>

<div class="rounded-lg bg-white p-4 w-fit min-w-64 duration-0 hidden:duration-0" data-popup="popupProfile">
	<div>
		<p class="font-bold my-1 px-2">{username}</p>
	</div>
	<hr class="my-2 md:my-4 !border-primary-400"/>
	<div>
		<form class="w-full" action="/signout" method="POST">
			<button 
				class="block w-full text-left my-1 px-2 py-1 rounded-md hover:bg-primary-400"
				type="submit"
			>
				Kilépés
			</button>
	</div>
</div>