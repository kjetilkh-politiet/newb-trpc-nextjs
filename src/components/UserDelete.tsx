'use client';

import { trpc } from '~/utils/trpc';

export default function UserDelete({ userId }: { userId: number }) {
	const utils = trpc.useUtils();
	const mutation = trpc.user.delete.useMutation({
		onSuccess: () => {
			utils.invalidate(undefined, { queryKey: ['user'] });
		},
	});

	return (
		<span>
			<button
				type="button"
				onClick={() => {
					mutation.mutate(userId);
				}}
				className="rounded py-1 px-2 bg-red-800"
			>
				Slett
			</button>
			{mutation.isError ? (
				<span className="text-red-300">{mutation.error.message}</span>
			) : (
				<></>
			)}
		</span>
	);
}
