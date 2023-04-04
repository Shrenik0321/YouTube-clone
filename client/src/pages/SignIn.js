import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // An issue each time the user logsout the page has to be refreshed inorder for the userId to change in the route
  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  async function handleSignIn(e) {
    e.preventDefault();
    dispatch(loginStart());

    if (username == "") {
      toast.error("Username not entered!");
    }

    if (password == "") {
      toast.error("Password not entered!");
    }

    try {
      const response = await Axios.post("/api/auth/signin", {
        username,
        password,
      });
      const expirationDate = new Date().getTime() + 3600 * 1000;
      const tokenObject = {
        userId: response.data._id,
        token: response.data.access_token,
        expiresAt: expirationDate,
      };
      localStorage.setItem("access_token", JSON.stringify(tokenObject));
      dispatch(loginSuccess(response.data));
      const userId = currentUser._id;
      navigate(`/home/${userId}`);
      window.location.reload();
    } catch (err) {
      dispatch(loginFailure());
      toast.error(err.response.data.message);
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
            focused
            InputProps={{
              style: {
                color: "white",
              },
            }}
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
            focused
            InputProps={{
              style: {
                color: "white",
              },
            }}
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
