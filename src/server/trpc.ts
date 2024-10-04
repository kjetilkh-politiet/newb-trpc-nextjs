/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @link https://trpc.io/docs/v11/router
 * @link https://trpc.io/docs/v11/procedures
 */

import { initTRPC } from '@trpc/server';
import { transformer } from '~/utils/transformer';
import type { Context } from './context';
import { ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
	/**
	 * @link https://trpc.io/docs/v11/data-transformers
	 */
	transformer,
	/**
	 * @link https://trpc.io/docs/server/error-formatting#adding-custom-formatting
	 */
	errorFormatter(opts) {
		const { shape, error } = opts;

		const zodErrorResult = (() => {
			if (error.code !== 'BAD_REQUEST') return null;
			if (!(error.cause instanceof ZodError)) return null;

			// format zod error
			const zodError = error.cause.flatten();
			const parts: string[] = [];
			if (zodError.formErrors.length) {
				parts.push(`Skjema: ${zodError.formErrors.join(', ')}`);
			}
			if (
				zodError.fieldErrors &&
				Object.keys(zodError.fieldErrors).length
			) {
				parts.push(
					...Object.entries(zodError.fieldErrors).map(
						([field, error]) => `${field}: ${error?.join(', ')}`,
					),
				);
			}
			const zodErrorMessage = parts.join(', ');

			return {
				zodError,
				zodErrorMessage,
			} as const;
		})();

		return {
			...shape,
			data: {
				...shape.data,
				zodError: zodErrorResult?.zodError,
				zodErrorMessage: zodErrorResult?.zodErrorMessage,
			},
		};
	},
});

/**
 * Create a router
 * @link https://trpc.io/docs/v11/router
 */
export const router = t.router;

/**
 * Create an unprotected procedure
 * @link https://trpc.io/docs/v11/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * Merge multiple routers together
 * @link https://trpc.io/docs/v11/merging-routers
 */
export const mergeRouters = t.mergeRouters;

/**
 * Create a server-side caller
 * @link https://trpc.io/docs/v11/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;
