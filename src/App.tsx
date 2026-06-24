import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Overview from "./pages/Overview";
import Create from "./pages/Create";

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

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = (newUser: NewUserData) => {
    const user: User = {
      ...newUser,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [user, ...prev]);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Übersicht</Link>
        <Link to="/create">Erstellen</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Overview users={users} />} />
        <Route path="/create" element={<Create onAddUser={handleAddUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
