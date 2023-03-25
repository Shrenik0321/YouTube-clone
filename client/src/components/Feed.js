import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Axios from "../axios.js";

const Feed = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await Axios.get("/api/video/random");
        setVideo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
    console.log(video);
  }, []);

  return (
    <Box backgroundColor="black" flex={6} p={2}>
      <Grid container spacing={2} columns={24}>
        {video.map((video) => (
          <Grid item xs={8}>
            <Card sx={{ backgroundColor: "black" }}>
              <CardMedia
                component="img"
                height="194"
                image={video.imgUrl}
                alt="Paella dish"
              />
              <CardContent>
                <Typography color="white" sx={{ fontSize: "20px" }}>
                  {video.title}
                </Typography>
                <Typography color="white" sx={{ fontSize: "15px" }}>
                  {video.desc}
                </Typography>
                <Typography color="white" sx={{ fontSize: "10px" }}>
                  {video.views}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
