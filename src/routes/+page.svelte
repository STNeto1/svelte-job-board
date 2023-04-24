<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
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

		<section class="flex flex-col gap-4 pt-10">
			{#each data.posts as job (job.id)}
				<a href={job.link} class="card card-hover col-span-1 w-full h-full">
					<div class="p-4 space-y-4">
						<div class="flex items-center justify-between">
							<h3 data-toc-ignore>{job.title}</h3>
						</div>

						<article>
							<p>
								{job.description}
							</p>

							<div class="flex flex-col gap-2 mt-4">
								<div class="flex flex-col">
									<span class="text-sm">Company</span>
									<span class="text-sm font-bold">{job.company}</span>
								</div>

								<div class="flex flex-col">
									<span class="text-sm">Location</span>
									<span class="text-sm font-bold">{job.location ?? 'Not specified'}</span>
								</div>
							</div>
						</article>
					</div>
				</a>
			{/each}
		</section>
	</section>
</AppShell>
