import * as React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const VideoTab = ({ video }) => {
  return (
    <Grid item xs={9}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Box>
          <img
            src={video.snippet.thumbnails.high.url}
            alt="My Image"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default VideoTab;
