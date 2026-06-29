import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
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
      <Box sx={{ maxWidth: 980, mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{ p: 4, textAlign: "center", border: "1px solid #e2e8f2" }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Benutzer nicht gefunden
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Zurück zur Übersicht
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 980, mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          border: "1px solid #e2e8f2",
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,252,255,1) 100%)",
        }}
      >
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Benutzer bearbeiten
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aktualisiere die Profildaten.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Geburtsdatum"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="Geschlecht"
                  name="gender"
                  value={formData.gender}
                  onChange={(event) => handleGenderChange(event.target.value)}
                  required
                >
                  <MenuItem value="">-- Bitte auswählen --</MenuItem>
                  <MenuItem value="Männlich">Männlich</MenuItem>
                  <MenuItem value="Weiblich">Weiblich</MenuItem>
                  <MenuItem value="Divers">Divers</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email Adresse"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Post Adresse"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Telefonnummer"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Webseite"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 2.5 }}
            >
              <Button variant="contained" type="submit" size="large">
                Änderungen speichern
              </Button>

              <Button
                variant="outlined"
                type="button"
                size="large"
                onClick={() => navigate("/")}
              >
                Abbrechen
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Edit;
