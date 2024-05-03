import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Stack,
  createTheme,
  ThemeProvider,
  Divider,
} from "@mui/material";

//pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavBar from "./pages/NavBar";
import Home from "./pages/Home";
import FarmNodeManage from "./pages/FarmNodeManage";
import SensorLogs from "./pages/SensorLogs";
import NodeMediaManage from "./pages/NodeMediaManage";

//icons
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import styled from "@emotion/styled";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 920,
      md: 1024,
      lg: 1200,
      xl: 1800,
    },
  },
  palette: {
    primary: {
      main: "#292929",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const MainContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
}));

const NavBarContainer = styled(Box)(() => ({
  // border: "2px solid orange",
}));

const SubContainer = styled(Box)(() => ({
  display: "flex",
  // border: "20px solid green",
  position: "relative",
  flex: 1,
}));

const SideBarContainer = styled(Box)(({ theme, sideBarOpen }) => ({
  height: "100%",
  position: "relative",
  zIndex: 3,
  overflow: "hidden",
  borderRight: "1px solid grey",
  backgroundColor: theme.palette.secondary.main,
  flex: sideBarOpen ? 1.1 : 0,
  transition: "flex ease-in 0.3s",
  [theme.breakpoints.between("md", "xl")]: {
    flex: sideBarOpen ? 2 : 0,
  },
  [theme.breakpoints.down("md")]: {
    position: "absolute",
    left: sideBarOpen ? 0 : -500,
    transition: "left ease-out 0.5s",
  },
}));

const ContentContainer = styled(Box)(() => ({
  // border: "2px solid red",
  flex: 8,
}));

const OverLay = styled("div")(({ theme, sideBarOpen }) => ({
  zIndex: 2,
  position: "absolute",
  backgroundColor: "black",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0.5,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
    visibility: sideBarOpen ? "visisble" : "hidden",
    // transition: "visibility ease-in 0.2s",
  },
}));

function App() {
  const navigate = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleWindowResize = () => {
    if (window.innerWidth < 1024) setSideBarOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <NavBarContainer>
          <NavBar setDrawerOpen={setSideBarOpen} drawerOpen={sideBarOpen} />
        </NavBarContainer>
        <SubContainer>
          <SideBarContainer sideBarOpen={sideBarOpen}>
            <Stack
              justifyContent="center"
              sx={{
                height: "100%",
              }}
            >
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <ListItem>
                  <ListItemButton onClick={() => navigate("/")}>
                    <ListItemIcon>
                      <HomeRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/control-panel")}>
                    <ListItemIcon>
                      <HubRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Control" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("sensor-logs")}>
                    <ListItemIcon>
                      <DatasetRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Logs" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/media")}>
                    <ListItemIcon>
                      <MovieRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Media" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/media")}>
                    <ListItemIcon>
                      <NotificationsActiveRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Notifications" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={() => navigate("/media")}>
                    <ListItemIcon>
                      <ContactMailRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                  </ListItemButton>
                </ListItem>
                <Divider sx={{ marginTop: 2, width: "80%", margin: "auto" }} />
                <ListItem sx={{ marginTop: 3 }}>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutRoundedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
          </SideBarContainer>
          <OverLay
            sideBarOpen={sideBarOpen}
            onClick={() => setSideBarOpen(false)}
          />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/control-panel/*" element={<FarmNodeManage />} />
              <Route path="/sensor-logs/*" element={<SensorLogs />} />
              <Route path="/media/*" element={<NodeMediaManage />} />
            </Routes>
          </ContentContainer>
        </SubContainer>
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
