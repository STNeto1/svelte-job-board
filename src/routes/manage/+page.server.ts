import prisma from '$lib/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		throw redirect(302, '/sign-in');
	}

	const posts = await prisma.job.findMany({
		where: {
			authUserId: user.userId
		}
	});

	return {
		posts
	};
};

const createJobSchema = z.object({
	title: z.string().min(3).max(32),
	description: z.string(),
	link: z.string().max(64),
	company: z.string().max(64),
	location: z.nullable(z.string())
});

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const { user } = await locals.auth.validateUser();

		if (!user) {
			throw redirect(302, '/sign-in');
		}

		const form = await request.formData();
		const title = form.get('title');
		const description = form.get('description');
		const link = form.get('link');
		const company = form.get('company');
		const location = form.get('location');

		const result = createJobSchema.safeParse({
			title,
			description,
			link,
			company,
			location
		});

		if (!result.success) {
			return fail(400, {
				message: 'Invalid form data',
				errors: {
					title: result.error.issues.find((issue) => issue.path[0] === 'title')?.message,
					description: result.error.issues.find((issue) => issue.path[0] === 'description')
						?.message,
					link: result.error.issues.find((issue) => issue.path[0] === 'link')?.message,
					company: result.error.issues.find((issue) => issue.path[0] === 'company')?.message,
					location: result.error.issues.find((issue) => issue.path[0] === 'location')?.message
				}
			});
		}

		await prisma.job.create({
			data: {
				title: result.data.title,
				description: result.data.description,
				link: result.data.link,
				company: result.data.company,
				location: result.data.location,
				authUserId: user?.userId
			}
		});

		return { success: true };
	},
	delete: async ({ locals, request }) => {
		const { user } = await locals.auth.validateUser();

		if (!user) {
			throw redirect(302, '/sign-in');
		}

		const form = await request.formData();
		const id = form.get('id');

		if (!id || typeof id !== 'string') {
			return fail(400);
		}

		await prisma.job.delete({
			where: {
				id
			}
		});

		return { success: true };
	}
};
