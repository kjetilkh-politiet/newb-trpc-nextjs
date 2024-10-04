import { trpc } from '~/utils/trpc';
import UserDelete from './UserDelete';

export default function Users() {
	// Queries
	const users = trpc.user.list.useQuery();

	return (
		<section>
			<table className="data-table">
				<thead>
					<tr>
						<td>ID</td>
						<td>Fornavn</td>
						<td>Etternavn</td>
						<td>E-post</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{users.data?.map?.((user) => {
						return (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
								<td>
									<UserDelete userId={user.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
}
