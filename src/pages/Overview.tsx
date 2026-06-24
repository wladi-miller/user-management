import type { User } from "../App";

type OverviewProps = {
  users: User[];
};

function Overview({ users }: OverviewProps) {
  return (
    <>
      <h1>Übersicht</h1>
      {users.length === 0 ? (
        <p>Noch keine Benutzer erstellt.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Geschlecht</th>
              <th>Geburtsdatum</th>
              <th>Telefonnummer</th>
              <th>Webseite</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.birthdate}</td>
                <td>{user.phone}</td>
                <td>
                  {user.website ? (
                    <a href={user.website} target="_blank" rel="noreferrer">
                      {user.website}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Overview;
