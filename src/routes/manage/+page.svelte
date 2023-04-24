<script lang="ts">
	import { enhance } from '$app/forms';
	import { AppBar, AppShell, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { ChevronLeftIcon } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let currentTab: number = 1;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Management</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="container mx-auto max-w-2xl">
	<AppShell>
		<svelte:fragment slot="header">
			<AppBar>
				<svelte:fragment slot="lead">
					<a href="/"> <ChevronLeftIcon /></a>
				</svelte:fragment>

				<svelte:fragment slot="trail">
					<h4>Job Board Management</h4>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>

		<TabGroup>
			<Tab bind:group={currentTab} name="tab1" value={0}>Posted</Tab>
			<Tab bind:group={currentTab} name="tab2" value={1}>Add</Tab>

			<svelte:fragment slot="panel">
				{#if currentTab === 0}
					(tab panel 1 contents)
				{:else if currentTab === 1}
					<form method="post" action="?/create" use:enhance class="-4 flex flex-col gap-3">
						<!-- <h3 class="text-center">Create a new job post</h3> -->
						{#if form?.success}
							<aside class="alert variant-filled-success my-4">
								<div class="alert-message">
									<h4>New job created with success</h4>
								</div>
							</aside>
						{/if}

						<div class="flex flex-col gap-1">
							<label class="label">
								<span>Title</span>
								<input class="input variant-form-material" type="text" name="title" required />
							</label>

							{#if form?.errors?.title}<p class="error">{form.errors.title}</p>{/if}
						</div>

						<div class="flex flex-col gap-1 w-full">
							<label class="label">
								<span>Description</span>
								<textarea class="textarea variant-form-material" name="description" required />
							</label>
							{#if form?.errors?.description}<p class="error">{form.errors.description}</p>{/if}
						</div>

						<div class="flex flex-col gap-1">
							<label class="label">
								<span>Link</span>
								<input class="input variant-form-material" type="text" name="link" required />
							</label>

							{#if form?.errors?.link}<p class="error">{form.errors.link}</p>{/if}
						</div>

						<div class="flex flex-col gap-1">
							<label class="label">
								<span>Company</span>
								<input class="input variant-form-material" type="text" name="company" required />
							</label>

							{#if form?.errors?.company}<p class="error">{form.errors.company}</p>{/if}
						</div>

						<div class="flex flex-col gap-1">
							<label class="label">
								<span>Location</span>
								<input class="input variant-form-material" type="text" name="location" />
							</label>

							{#if form?.errors?.location}<p class="error">{form.errors.location}</p>{/if}
						</div>

						<div class="mt-2">
							<button type="submit" class="btn variant-filled-primary w-full variant-form-material"
								>Create</button
							>
						</div>

						{#if form?.message}
							<aside class="alert variant-filled-error my-4">
								<div class="alert-message">
									<h4>Invalid request</h4>
									<p>{form?.message}</p>
								</div>
							</aside>
						{/if}
					</form>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</AppShell>
</section>
