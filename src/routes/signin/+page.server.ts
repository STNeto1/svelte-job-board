import { auth } from "$lib/server/lucia";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { z } from "zod";

import { LuciaError } from "lucia-auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/");
	return {};
};

const signInSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().max(64),
})

export const actions: Actions = {
  default: async ({request, locals}) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    const result = signInSchema.safeParse({
      username,
      password,
    });

    if (!result.success) {
      return fail(400, {
        message: 'Invalid form data',
        errors: {
          username: result.error.issues.find(issue => issue.path[0] === 'username')?.message,
          password: result.error.issues.find(issue => issue.path[0] === 'password')?.message,
        }
      })
    }

    try {
      const key = await auth.useKey('username', result.data.username, result.data.password)
    const session = await auth.createSession(key.userId)
    locals.auth.setSession(session)
    } catch (error) {
      if (
				error instanceof LuciaError &&
				(error.message === 'AUTH_INVALID_KEY_ID' || error.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect username or password.'
				});
			}
			// database connection error
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
    }
  }
};
