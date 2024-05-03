import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";

const LoginContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const LoginForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const LoginSubContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

function Login() {
  return (
    <LoginContainer>
      <LoginForm component="form" width={300} marginTop={10}>
        <Typography
          variant="h1"
          align="center"
          fontSize={25}
          fontWeight={400}
          color="primary"
        >
          Sign in to Anmaya
        </Typography>
        <TextField label="Email" sx={{ marginTop: 2 }} size="medium" />
        <Typography
          align="end"
          sx={{
            marginTop: 2,
            border: 0,
            background: "none",
            cursor: "pointer",
            width: "fit-content",
          }}
          component="button"
        >
          Forgot password?
        </Typography>
        <TextField label="Password" size="medium" sx={{ marginTop: 1 }} />
        <Button
          variant="contained"
          sx={{ marginTop: 4, p: 1, textTransform: "initial" }}
          size="large"
        >
          Sign in
        </Button>
      </LoginForm>
      <LoginSubContainer width={300} sx={{ marginTop: 4 }}>
        <Typography>New User?</Typography>
        <Button
          size="medium"
          variant="outlined"
          sx={{ textTransform: "initial" }}
        >
          Create an account
        </Button>
      </LoginSubContainer>
    </LoginContainer>
  );
}

export default Login;
