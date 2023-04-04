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
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { fetchSuggestedSearchVideos } from "../redux/videoSlice.js";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "black",
});

export default function Navbar2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchVal, setSearchval] = useState("");

  function handleSearchClick() {
    dispatch(fetchSuggestedSearchVideos(searchVal));
  }
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
            DeepTube
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
      </StyledToolbar>
    </AppBar>
  );
}
