import { dev } from "$app/environment";
import prisma from "@lucia-auth/adapter-prisma";
import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";

import prismaClient from "../prisma";

export const auth = lucia({
	adapter: prisma(prismaClient),
	env: dev ? "DEV" : "PROD",
	middleware: sveltekit(),
  transformDatabaseUser(databaseUser) {
    return {
      userId: databaseUser.id,
      username: databaseUser.username,
    }
  },
});

export type Auth = typeof auth;
