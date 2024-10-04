/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { db } from '../drizzle';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { user } from '../schema';

export const userRouter = router({
	list: publicProcedure.query(async () => {
		return await db.query.user.findMany();
	}),
	delete: publicProcedure
		.input(z.number())
		.mutation(async ({ input: userId }) => {
			const result = await db.delete(user).where(eq(user.id, userId));
			if (result[0].affectedRows <= 0)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message:
						'Ingen bruker ble slettet av en eller annen grunn.',
				});

			return {
				status: 'success',
				message: 'Bruker slettet.',
			} as const;
		}),
	create: publicProcedure
		.input(
			z.object({
				firstName: z.string().min(3),
				lastName: z.string().min(3),
				email: z.string().email(),
			}),
		)
		.mutation(async ({ input: userCreate }) => {
			const result = await db.insert(user).values(userCreate);
			if (result[0].affectedRows <= 0)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message:
						'Ingen bruker ble opprettet av en eller annen grunn.',
				});

			return {
				status: 'success',
				message: 'Bruker lagt til.',
			} as const;
		}),
});
