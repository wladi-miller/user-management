import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { NewUserData } from "../App";
import { getRandomUserTemplate } from "../api/users";

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
    avatarUrl: "",
  });

  const [isRandomLoading, setIsRandomLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const resetForm = () => {
    setFormData({
      username: "",
      birthdate: "",
      gender: "",
      email: "",
      address: "",
      phone: "",
      website: "",
      avatarUrl: "",
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    let payload = formData;

    if (!payload.avatarUrl.trim()) {
      try {
        const randomUser = await getRandomUserTemplate();
        payload = { ...payload, avatarUrl: randomUser.avatarUrl };
      } catch {
        setErrorMessage("Profilbild konnte nicht automatisch geladen werden.");
      }
    }

    onAddUser(payload);
    resetForm();
    navigate("/");
  };

  const handleRandomFill = async () => {
    setErrorMessage("");
    setIsRandomLoading(true);

    try {
      const randomUser = await getRandomUserTemplate();
      setFormData(randomUser);
    } catch {
      setErrorMessage("Zufällige Daten konnten nicht geladen werden.");
    } finally {
      setIsRandomLoading(false);
    }
  };

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
              Benutzer erstellen
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Trage Daten manuell ein oder lade zufällige Profildaten.
            </Typography>
          </Box>

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

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
              <Button
                variant="contained"
                type="submit"
                size="large"
                disabled={isRandomLoading}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                type="button"
                size="large"
                onClick={handleRandomFill}
                disabled={isRandomLoading}
                startIcon={
                  isRandomLoading ? <CircularProgress size={16} /> : undefined
                }
              >
                {isRandomLoading ? "Lade..." : "Zufällige Daten laden"}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Create;
