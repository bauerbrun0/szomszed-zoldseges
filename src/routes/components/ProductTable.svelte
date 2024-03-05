<script lang="ts">
	import type { Product } from "$lib/types";

	export let products: Product[];
	export let title: string;  	
</script>

<h3 class="h3 my-4">{title}</h3>
<div class="table-container mb-8">
	<table class="table table-hover table-compact">
		<thead class="text-left">
			<th>Termék</th>
			<th>Származási hely</th>
			<th>Készlet</th>
			<th>Ár</th>
		</thead>
		<tbody>
			{#each products as product}
				<tr class="h-px">
					<td>
						<div class="flex h-full space-x-2 md:space-x-4">
							<img src={product.imagePath} alt={product.name} class="w-20 h-20 object-cover rounded-lg" />
							<span>{product.name}</span>
						</div>
					</td>
					<td>{product.origin}</td>
					<td>{product.stock}</td>
					<td>{product.price}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
