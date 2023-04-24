<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import type { User } from 'lucia-auth';

	export let data: { user: User | null };
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<h3 class="text-center">Svelte Job Board</h3>
	</svelte:fragment>

	<section class="container mx-auto max-w-xl">
		<section class="pt-4">
			{#if data.user}
				<div class="flex items-center justify-between">
					<h6>
						{data.user.username}
					</h6>

					<div class="flex items-center gap-2">
						<a href="/manage"> Your jobs </a>
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
</AppShell>
