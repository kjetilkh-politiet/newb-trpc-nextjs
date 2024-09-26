/**
 * Integration test example for the `post` router
 */
// import type { inferProcedureInput } from '@trpc/server';
// import { createContextInner } from '../context';
// import type { AppRouter } from './_app';
// import { createCaller } from './_app';

// test('add and get post', async () => {
//   const ctx = await createContextInner({});
//   const caller = createCaller(ctx);

//   const input: inferProcedureInput<AppRouter['user']['add']> = {
//     text: 'hello test',
//     title: 'hello test',
//   };

//   const post = await caller.user.add(input);
//   const byId = await caller.user.byId({ id: post.id });

//   expect(byId).toMatchObject(input);
// });
