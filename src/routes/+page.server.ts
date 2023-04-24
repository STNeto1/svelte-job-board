import prisma from '$lib/prisma';
import { fail, type Actions } from '@sveltejs/kit';

import { auth } from '../lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const { user } = await locals.auth.validateUser();

	const posts = await prisma.job.findMany({
		where: {
			OR: [
				{
					title: {
						contains: url.searchParams.get('term') ?? ''
					}
				},
				{
					description: {
						contains: url.searchParams.get('term') ?? ''
					}
				},
				{
					company: {
						contains: url.searchParams.get('term') ?? ''
					}
				},
				{
					location: {
						contains: url.searchParams.get('term') ?? ''
					}
				}
			]
		},
		include: {
			user: {
				select: {
					username: true
				}
			}
		}
	});

	return {
		user,
		posts,
		term: url.searchParams.get('term') ?? ''
	};
};

export const actions: Actions = {
	// signout
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
	}
};
