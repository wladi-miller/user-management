import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import PublicIcon from "@mui/icons-material/Public";
import type { User } from "../App";

type OverviewProps = {
  users: User[];
  onDeleteUser: (userId: string) => void;
};

function Overview({ users, onDeleteUser }: OverviewProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
      <Box sx={{ mb: 3, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Übersicht
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Liste aller registrierten Benutzer.
        </Typography>
      </Box>

      {users.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            border: "1px solid #e2e8f2",
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,252,255,1) 100%)",
            borderRadius: 3,
          }}
        >
          <Typography color="text.secondary" sx={{ fontSize: "1.1rem" }}>
            Noch keine Benutzer erstellt.
          </Typography>
        </Paper>
      ) : isMobile ? (
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {users.map((user) => (
            <Grid size={{ xs: 12, md: 6 }} key={user.id}>
              <Card
                elevation={0}
                sx={{
                  border: "1px solid #e2e8f2",
                  borderRadius: 3,
                  transition: "box-shadow 0.2s, transform 0.2s",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center", mb: 2 }}
                  >
                    <Avatar
                      src={
                        user.avatarUrl?.trim()
                          ? user.avatarUrl
                          : "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={user.username}
                      sx={{ width: 64, height: 64 }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        noWrap
                        sx={{ fontWeight: 700, fontSize: "1.25rem" }}
                      >
                        {user.username}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" noWrap>
                        {user.gender}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center" }}
                    >
                      <EmailIcon
                        sx={{ fontSize: 22, color: "text.secondary" }}
                      />
                      <Typography variant="body1" noWrap>
                        {user.email}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center" }}
                    >
                      <PhoneIcon
                        sx={{ fontSize: 22, color: "text.secondary" }}
                      />
                      <Typography variant="body1" noWrap>
                        {user.phone}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center" }}
                    >
                      <CakeIcon
                        sx={{ fontSize: 22, color: "text.secondary" }}
                      />
                      <Typography variant="body1" noWrap>
                        {user.birthdate}
                      </Typography>
                    </Stack>
                    {user.website && (
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                      >
                        <PublicIcon
                          sx={{ fontSize: 22, color: "text.secondary" }}
                        />
                        <Typography variant="body1" noWrap>
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: "#2458D3",
                              textDecoration: "none",
                              fontWeight: 500,
                            }}
                          >
                            {user.website.replace(/^https?:\/\//, "")}
                          </a>
                        </Typography>
                      </Stack>
                    )}
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ justifyContent: "flex-end" }}
                  >
                    <Button
                      component={Link}
                      to={"/edit/" + user.id}
                      variant="contained"
                      disableElevation
                      size="medium"
                      startIcon={<EditIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "#eaf1ff",
                        color: "#2458D3",
                        "&:hover": { bgcolor: "#dbe5ff" },
                      }}
                    >
                      Bearbeiten
                    </Button>
                    <IconButton
                      color="error"
                      size="medium"
                      onClick={() => onDeleteUser(user.id)}
                      sx={{
                        bgcolor: "#ffecec",
                        "&:hover": { bgcolor: "#ffdede" },
                        borderRadius: 2,
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid #e2e8f2", borderRadius: 3 }}
        >
          <Table sx={{ minWidth: 900 }} aria-label="Benutzer Tabelle">
            <TableHead sx={{ bgcolor: "#f8fafc" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Bild</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Geschlecht</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Geburtsdatum</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Telefonnummer</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem" }}>Webseite</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: "1.05rem", textAlign: "right" }}>
                  Aktionen
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "#fbfcfd" },
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={
                        user.avatarUrl?.trim()
                          ? user.avatarUrl
                          : "https://randomuser.me/api/portraits/lego/1.jpg"
                      }
                      alt={user.username}
                      sx={{ width: 48, height: 48 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: "1.05rem" }}>
                    {user.username}
                  </TableCell>
                  <TableCell sx={{ color: "#475569", fontSize: "1.05rem" }}>{user.email}</TableCell>
                  <TableCell sx={{ color: "#475569", fontSize: "1.05rem" }}>{user.gender}</TableCell>
                  <TableCell sx={{ color: "#475569", fontSize: "1.05rem" }}>
                    {user.birthdate}
                  </TableCell>
                  <TableCell sx={{ color: "#475569", fontSize: "1.05rem" }}>{user.phone}</TableCell>
                  <TableCell sx={{ fontSize: "1.05rem" }}>
                    {user.website ? (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#2458D3",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        Link
                      </a>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>-</span>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "flex-end" }}
                    >
                      <Button
                        component={Link}
                        to={"/edit/" + user.id}
                        variant="contained"
                        disableElevation
                        size="small"
                        startIcon={<EditIcon />}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          bgcolor: "#eaf1ff",
                          color: "#2458D3",
                          "&:hover": { bgcolor: "#dbe5ff" },
                        }}
                      >
                        Bearbeiten
                      </Button>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDeleteUser(user.id)}
                        sx={{
                          bgcolor: "#ffecec",
                          "&:hover": { bgcolor: "#ffdede" },
                          borderRadius: 2,
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Overview;
