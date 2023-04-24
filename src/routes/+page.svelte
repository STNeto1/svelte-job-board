<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from 'lucia-auth';

	export let data: { user: User | null };
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container mx-auto max-w-xl pt-10">
	<h2 class="text-center">Svelte Job Board</h2>

	<section class="pt-4">
		{#if data.user}
			<div class="flex items-center justify-between">
				<h6>
					{data.user.username}
				</h6>

				<div class="flex items-center gap-2">
					<a href="/"> Your jobs </a>

					<form use:enhance method="post">
						<button type="submit"> Sign out </button>
					</form>
				</div>
			</div>
		{:else}
			<div class="flex items-center gap-2">
				<div>
					<a href="/signin">Signin</a>
				</div>
				<div>
					<a href="/signup">Signup</a>
				</div>
			</div>
		{/if}
	</section>
</section>
