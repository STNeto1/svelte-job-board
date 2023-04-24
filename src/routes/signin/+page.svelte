<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: { message: string; errors?: Record<string, string> };
</script>

<div>
	<h1>Sign in</h1>

	<form method="post" use:enhance>
		<label for="username">Username</label><br />
		<input id="username" name="username" required /><br />
		{#if form?.errors?.username}<p class="error">{form.errors.username}</p>{/if}

		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" required /><br />
		{#if form?.errors?.password}<p class="error">{form.errors.password}</p>{/if}

		{#if form?.message}
			<p class="error">{form.message || ''}</p>
		{/if}

		<button type="submit"> Sign in </button>
	</form>
</div>
