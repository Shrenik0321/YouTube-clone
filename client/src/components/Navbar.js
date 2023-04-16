import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { fetchSearchedVideos } from "../redux/videoSlice.js";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router-dom";
import { auth } from "../firebase-config/firebase.js";
import { signOut } from "firebase/auth";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#18181b",
});

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchVal, setSearchval] = useState();

  function handleSearchClick() {
    dispatch(fetchSearchedVideos(searchVal));
  }

  function handleLogoutClick() {
    localStorage.removeItem("access_token");
    signOut(auth)
      .then(() => {
        // Handle successful sign-out.
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        // Handle sign-out error.
        console.log("Error signing out:", error);
      });
    navigate("/");
  }

  const { currentUser } = useSelector((state) => state.user);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            navigate(`/home/${id}`);
          }}
        >
          <YouTubeIcon fontSize="medium" sx={{ fontSize: 40, color: "red" }} />
          <Typography
            variant="h5"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            notYouTube
          </Typography>
        </Box>
        <Paper
          component="form"
          sx={{
            p: "1px",
            display: "flex",
            alignItems: "center",
            width: 430,
            borderRadius: "50px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "red" }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(e) => setSearchval(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", color: "red" }}
            aria-label="search"
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "40px" }} />
          <Typography sx={{ fontSize: "25px" }}>
            {currentUser ? currentUser.username : "Test"}
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
