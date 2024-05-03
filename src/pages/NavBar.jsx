import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";

function NavBar({ setDrawerOpen, drawerOpen }) {
  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        position: "relative",
        zIndex: 10,
        boxShadow: 0,
        height: "100%",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Anmaya
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
