import { auth } from "$lib/server/lucia";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { z } from "zod";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, "/");
  return {};
};

const signUpSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().max(64),
})

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    console.log(username, password);
    

    const result = signUpSchema.safeParse({
      username,
      password,
    });

    if (!result.success) {
      return fail(400, {
        username,
        errors: {
          username: result.error.issues.find(issue => issue.path[0] === 'username')?.message,
          password: result.error.issues.find(issue => issue.path[0] === 'password')?.message,
        }
      })
    }

    const user = await auth.createUser({
      primaryKey: {
        providerId: 'username',
        providerUserId: result.data.username,
        password: result.data.password,
      },
      attributes: {
        username: result.data.username,
      }
    })
    const session = await auth.createSession(user.userId)
    locals.auth.setSession(session)

  }
};
