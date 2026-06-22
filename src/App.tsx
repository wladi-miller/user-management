import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Overview from "./pages/Overview";
import Create from "./pages/Create";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Übersicht</Link>
        <Link to="/create">Erstellen</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
