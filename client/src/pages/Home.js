import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Feed />
      </Stack>
    </Box>
  );
};

export default Home;
