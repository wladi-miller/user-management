import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NewUserData } from "../App";

type CreateProps = {
  onAddUser: (user: NewUserData) => void;
};

function Create({ onAddUser }: CreateProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewUserData>({
    username: "",
    birthdate: "",
    gender: "",
    email: "",
    address: "",
    phone: "",
    website: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      birthdate: "",
      gender: "",
      email: "",
      address: "",
      phone: "",
      website: "",
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Formular gesendet:", formData);
    onAddUser(formData);
    resetForm();
    navigate("/");
  };

  return (
    <main className="app-content">
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

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Create;
