import * as React from "react";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "../components/Navbar";
import SuggestionsBar from "../components/SuggestionsBar";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/system";
import VideoTab from "../components/VideoTab";

const VideoDetail = () => {
  const { state } = useLocation();
  const video = state.video;
  return (
    <Box>
      <Navbar />
      <Grid container spacing={2}>
        <VideoTab video={video} />
        <SuggestionsBar />
      </Grid>
    </Box>
  );
};

export default VideoDetail;
