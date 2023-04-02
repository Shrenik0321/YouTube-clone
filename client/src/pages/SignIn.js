import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "../axios.js";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await Axios.post("/api/auth/signin", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      dispatch(loginSuccess(response.data));
      navigate("/home");
      window.location.reload();
    } catch (err) {
      dispatch(loginFailure());
      console.error(err.response.data);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            Sign In with Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                "Don't have an account? Sign Up"
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
