import { Link } from "react-router-dom";
import type { User } from "../App";

type OverviewProps = {
  users: User[];
  onDeleteUser: (userId: string) => void;
};

function Overview({ users, onDeleteUser }: OverviewProps) {
  return (
    <main className="app-content">
      <h1>Übersicht</h1>

      {users.length === 0 ? (
        <p className="empty-state">Noch keine Benutzer erstellt.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Geschlecht</th>
              <th>Geburtsdatum</th>
              <th>Telefonnummer</th>
              <th>Webseite</th>
              <th>Aktion</th>
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
                <td className="action-cell">
                  <Link className="edit-link" to={"/edit/" + user.id}>
                    Bearbeiten
                  </Link>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Overview;
