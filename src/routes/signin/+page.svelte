<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: { message: string; errors?: Record<string, string> };
</script>

<section class="w-screen h-screen flex items-center justify-center">
	<section class="flex flex-col gap-2 pt-10 shadow-md p-4">
		<form method="post" use:enhance class="card p-4 flex flex-col gap-3">
			<h3 class="text-center">Sign In</h3>

			<div class="flex flex-col gap-1">
				<label class="label">
					<span>Username</span>
					<input class="input variant-form-material" type="text" name="username" required />
				</label>

				{#if form?.errors?.username}<p class="error">{form.errors.username}</p>{/if}
			</div>

			<div class="flex flex-col gap-1 w-full">
				<label class="label">
					<span>Password</span>
					<input class="input variant-form-material" type="password" name="password" required />
				</label>
				{#if form?.errors?.password}<p class="error">{form.errors.password}</p>{/if}
			</div>

			<div class="mt-2">
				<button type="submit" class="btn variant-filled w-full variant-form-material"
					>Sign In</button
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

			<div class="flex justify-center">
				<a href="/signup">Don't have an account? Sign up</a>
			</div>
		</form>
	</section>
</section>
