import { trpc } from '~/utils/trpc';

export default function Users() {
  // Queries
  const users = trpc.user.list.useQuery(undefined, {});

  console.log('users is ', users);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Fornavn</td>
            <td>Etternavn</td>
            <td>E-post</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
