import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import { Box, Grid } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Grid container spacing={2}>
        <Sidebar />
        <Feed />
      </Grid>
    </Box>
  );
};

export default Home;
