import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { NewUserData, User } from "../App";

const emptyFormData: NewUserData = {
  username: "",
  birthdate: "",
  gender: "",
  email: "",
  address: "",
  phone: "",
  website: "",
  avatarUrl: "",
};

type EditProps = {
  users: User[];
  onUpdateUser: (userId: string, updatedData: NewUserData) => void;
};

function Edit({ users, onUpdateUser }: EditProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const userToEdit = users.find((user) => user.id === id);

  const [formData, setFormData] = useState<NewUserData>(() =>
    userToEdit
      ? {
          username: userToEdit.username,
          birthdate: userToEdit.birthdate,
          gender: userToEdit.gender,
          email: userToEdit.email,
          address: userToEdit.address,
          phone: userToEdit.phone,
          website: userToEdit.website,
          avatarUrl: userToEdit.avatarUrl ?? "",
        }
      : emptyFormData,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    onUpdateUser(id, formData);
    navigate("/");
  };

  if (!userToEdit) {
    return (
      <main className="app-content">
        <h1>Benutzer nicht gefunden</h1>
        <button type="button" onClick={() => navigate("/")}>
          Zurück zur Übersicht
        </button>
      </main>
    );
  }

  return (
    <main className="app-content">
      <h1>Benutzer bearbeiten</h1>

      <form className="input-form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <span className="input-title">Username</span>
          <input
            type="text"
            className="input-text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <span className="input-title">Geburtsdatum</span>
          <input
            type="date"
            className="input-text"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <span className="input-title">Geschlecht</span>
          <select
            className="input-text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Bitte auswählen --</option>
            <option value="Männlich">Männlich</option>
            <option value="Weiblich">Weiblich</option>
            <option value="Divers">Divers</option>
          </select>
        </div>

        <div className="input-container">
          <span className="input-title">Email Adresse</span>
          <input
            type="email"
            className="input-text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <span className="input-title">Post Adresse</span>
          <input
            type="text"
            className="input-text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <span className="input-title">Telefonnummer</span>
          <input
            type="tel"
            className="input-text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <span className="input-title">Webseite</span>
          <input
            type="url"
            className="input-text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="submit-button" type="submit">
            Änderungen speichern
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </main>
  );
}

export default Edit;
