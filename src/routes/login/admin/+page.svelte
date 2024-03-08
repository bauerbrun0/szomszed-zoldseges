<script lang="ts">
	export let form;

</script>

<!-- Full screen height using mobile -->
<div class="flex items-center min-h-[calc(100dvh-57px)] md:min-h-0">
	<div 
		class="
			card w-full mx-auto my-10 px-3 py-6
			md:w-2/3 lg:w-1/2 md:px-6 md:py-10
		"
	>
		<h2 class="h2 text-center text-xl font-bold md:text-2xl">Admin Belépés</h2>
		<form
			class="w-full mx-auto my-4 flex flex-col space-y-4 lg:w-2/3"
			method="POST"
		>
			<div class="space-y-1">
				<label for="email" class="label">
					Felhasználónév
				</label>
				<input
					type="text"
					id="username"
					name="username"
					class={`input w-full ${form?.errors?.username ? "input-error" : ""}`}
					autocapitalize="off"
					spellcheck="false"
					autocomplete="off"
					value={form?.fields?.username || ""}
					required
				/>
				{#if form?.errors?.username}
					<p class="block text-red-500">
						{form.errors.username}	
					</p>
				{/if}
			</div>
			<div class="space-y-1">			
				<label for="password" class="label">
					Jelszó	
				</label>
				<input
					type="password"
					id="password"
					name="password"
					class={`input w-full ${form?.errors?.password ? "input-error" : ""}`}
					autocapitalize="off"
					spellcheck="false"
					autocomplete="off"
					required
				/>
				{#if form?.errors?.password}
					<p class="block text-red-500">	
						{form.errors.password}	
					</p>
				{/if}
			</div>
			
			<div class="pt-4">
				<button
					type="submit"
					class="btn variant-filled w-full"
				>
					Belépés
				</button>
			</div>
		</form>
	</div>
</div>