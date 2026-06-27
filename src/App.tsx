import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/PersonAddAlt1";
import MenuIcon from "@mui/icons-material/Menu";
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
  avatarUrl: string;
};

export type User = NewUserData & {
  id: string;
  createdAt: string;
};

const STORAGE_KEY = "user-management-users";
const drawerWidth = 280;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2458D3",
    },
    secondary: {
      main: "#0C7A68",
    },
    background: {
      default: "#f4f7fb",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontWeight: 700,
    },
  },
});

function AppLayout({
  users,
  onAddUser,
  onDeleteUser,
  onUpdateUser,
}: {
  users: User[];
  onAddUser: (newUser: NewUserData) => void;
  onDeleteUser: (userId: string) => void;
  onUpdateUser: (userId: string, updatedData: NewUserData) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background:
          "linear-gradient(180deg, rgba(245,249,255,1) 0%, rgba(235,241,250,1) 100%)",
      }}
    >
      <Box sx={{ px: 2, py: 2.5, borderBottom: "1px solid #d7e1ef" }}>
        <Typography variant="h6" color="primary">
          User Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Verwaltung & Übersicht
        </Typography>
      </Box>

      <List sx={{ p: 1 }}>
        <ListItemButton
          component={Link}
          to="/"
          selected={location.pathname === "/"}
          onClick={() => setMobileOpen(false)}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Übersicht" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/create"
          selected={location.pathname === "/create"}
          onClick={() => setMobileOpen(false)}
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Erstellen" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid #e2e8f2",
          bgcolor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1.5, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Benutzerverwaltung
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #d7e1ef",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route
              path="/"
              element={<Overview users={users} onDeleteUser={onDeleteUser} />}
            />
            <Route path="/create" element={<Create onAddUser={onAddUser} />} />
            <Route
              path="/edit/:id"
              element={<Edit users={users} onUpdateUser={onUpdateUser} />}
            />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem(STORAGE_KEY);
    if (!savedUsers) return [];
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppLayout
          users={users}
          onAddUser={handleAddUser}
          onDeleteUser={handleDeleteUser}
          onUpdateUser={handleUpdateUser}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
