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

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#18181b",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0px 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVal, setSearchval] = useState();

  function handleSearchClick() {
    dispatch(fetchSearchedVideos(searchVal));
  }

  function handleLogoutClick() {
    navigate("/");
  }

  const { currentUser } = useSelector((state) => state.user);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <YouTubeIcon fontSize="medium" sx={{ fontSize: 40, color: "red" }} />
          <Typography
            variant="h5"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            DeepTube
          </Typography>
        </Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(e) => setSearchval(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
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
            width: "250px",
          }}
        >
          <AccountCircleIcon sx={{ fontSize: "40px" }} />
          <Typography sx={{ fontSize: "25px" }}>
            {currentUser ? currentUser.username : "Test"}
          </Typography>
          <Button variant="contained" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
