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
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding-top="0px"
        padding-left="0px"
      >
        <Box>
          <img
            src={video.snippet.thumbnails.high.url}
            alt="My Image"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ color: "#fff" }}>
            {video.snippet.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {video.snippet.description}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100vh"
        >
          <Box>
            <Typography variant="p" sx={{ color: "#fff" }}>
              {video.snippet.publishTime}
            </Typography>
          </Box>
          <Box>
            <Typography variant="p" sx={{ color: "#fff" }}>
              {video.snippet.publishedAt}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default VideoTab;
