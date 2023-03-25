import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Box,
  InputBase,
} from "@mui/material";
import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useSelector } from "react-redux";

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

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <YouTubeIcon fontSize="medium" sx={{ fontSize: 40, color: "red" }} />
          <Typography
            variant="h5"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            YouTube
          </Typography>
          <YouTubeIcon
            fontSize="large"
            sx={{ display: { xs: "block", sm: "none" } }}
          />
        </Box>
        <Search>
          <InputBase placeholder="search..."></InputBase>
        </Search>
        <Typography>{currentUser ? currentUser.username : "Test"}</Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
