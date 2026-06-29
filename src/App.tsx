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
  Avatar,
  Paper,
  Button,
  keyframes,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/PersonAddAlt1";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
      main: "#4f46e5", // Indigo
      light: "#818cf8",
      dark: "#3730a3",
    },
    secondary: {
      main: "#10b981", // Emerald
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#f1f5f9", // Slate 100
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#64748b", // Slate 500
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e2e8f0",
        },
      },
    },
  },
});

// --- Animations ---
const waveAnimation = keyframes`
  0%, 100% { height: 8px; }
  50% { height: 20px; }
`;

const pulseDot = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

function HeaderAnimation() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 4 } }}>
      {/* Network Activity Wave */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: 0.5 }}>
          DATA STREAM
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, height: 24 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Box
              key={i}
              sx={{
                width: 4,
                bgcolor: "primary.light",
                borderRadius: 4,
                animation: `${waveAnimation} 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Live System Status */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          bgcolor: "rgba(16, 185, 129, 0.1)",
          px: 2,
          py: 0.8,
          borderRadius: 8,
          border: "1px solid rgba(16, 185, 129, 0.2)"
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            bgcolor: "secondary.main",
            borderRadius: "50%",
            animation: `${pulseDot} 2s infinite`,
          }}
        />
        <Typography variant="body2" sx={{ color: "secondary.main", fontWeight: 600 }}>
          System Online
        </Typography>
      </Box>
    </Box>
  );
}
// ------------------

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

  const navigation = [
    { text: "Übersicht", icon: <DashboardIcon />, path: "/" },
    { text: "Benutzer anlegen", icon: <AddCircleOutlineIcon />, path: "/create" },
  ];

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#ffffff" }}>
      <Box sx={{ px: 3, py: 3.5, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3,
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(79, 70, 229, 0.4)",
          }}
        >
          <GroupIcon sx={{ color: "#fff", fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontSize: "1.3rem", lineHeight: 1.2, color: "text.primary" }}>
            NexUser
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 500 }}>
            Management
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 2, flexGrow: 1, mt: 1 }}>
        <Typography variant="overline" sx={{ px: 2, color: "text.secondary", fontWeight: 600 }}>
          Menü
        </Typography>
        {navigation.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith('/edit') && item.path === '/');
          return (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                mb: 1,
                borderRadius: 2.5,
                py: 1.2,
                px: 2,
                transition: "all 0.2s",
                ...(isActive
                  ? {
                      bgcolor: "rgba(79, 70, 229, 0.08)",
                      color: "primary.main",
                      "&:hover": { bgcolor: "rgba(79, 70, 229, 0.12)" },
                    }
                  : {
                      color: "text.secondary",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.03)", color: "text.primary" },
                    }),
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "primary.main" : "inherit",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    sx={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
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
          borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }}>
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <HeaderAnimation />
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
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, pt: { xs: 8, sm: 9 } }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4 } }}>
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
