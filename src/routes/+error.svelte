<script lang="ts">
	import { page } from "$app/stores";
</script>

<div class="
	mx-auto 2xl:max-w-screen-2xl
	px-2 md:px-4
	pt-4 md:pt-8
	flex flex-col items-center
">
	<img src="/images/error.png" alt="hiba kép" class="h-64 md:h-96 my-2" />
	<h3 class="h3 my-2">My Cabbages!</h3>
	<p class="font-light text-lg my-2">{$page.error?.message}</p>
	<a href="/" class="my-4">
		<button class="btn variant-filled-primary">
			Vissza a főoldalra
		</button>
	</a>
</div>