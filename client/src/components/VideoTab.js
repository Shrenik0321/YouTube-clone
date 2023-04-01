import * as React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const VideoTab = ({ video }) => {
  return (
    <Grid item xs={8}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          src={video.snippet.thumbnails.high.url}
          alt="My Image"
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    </Grid>
  );
};

export default VideoTab;
