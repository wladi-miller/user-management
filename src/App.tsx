import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Overview from "./pages/Overview";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

export type NewUserData = {
  username: string;
  birthdate: string;
  gender: string;
  email: string;
  address: string;
  phone: string;
  website: string;
};

export type User = NewUserData & {
  id: string;
  createdAt: string;
};

const STORAGE_KEY = "user-management-users";

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem(STORAGE_KEY);

    if (!savedUsers) {
      return [];
    }

    try {
      return JSON.parse(savedUsers) as User[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const handleAddUser = (newUser: NewUserData) => {
    const user: User = {
      ...newUser,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [user, ...prev]);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleUpdateUser = (userId: string, updatedData: NewUserData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user,
      ),
    );
  };

  return (
    <Router>
      <div className="app">
        <aside className="app-sidebar">
          <div className="sidebar-container">
            <div className="sidebar-header">
              <img
                className="sidebar-header-image"
                src="/user-management-icon.svg"
                alt="User Management"
              />
            </div>
            <div className="sidebar-body">
              <Link to="/">
                <button className="sidebar-item" type="button">
                  Übersicht
                </button>
              </Link>
              <Link to="/create">
                <button className="sidebar-item" type="button">
                  Erstellen
                </button>
              </Link>
            </div>
          </div>
        </aside>

        <Routes>
          <Route
            path="/"
            element={<Overview users={users} onDeleteUser={handleDeleteUser} />}
          />
          <Route
            path="/create"
            element={<Create onAddUser={handleAddUser} />}
          />
          <Route
            path="/edit/:id"
            element={<Edit users={users} onUpdateUser={handleUpdateUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
