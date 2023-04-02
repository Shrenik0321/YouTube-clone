import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { fetchFromApi } from "../fetchFromApi.js";
import { useSelector } from "react-redux";
import VideoDeatil from "../pages/VideoDetail.js";
import { useNavigate } from "react-router-dom";
// import { fetchAsyncVideos } from "../redux/videoSlice.js"

const Feed = () => {
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState("New");
  const { currentSearchValue } = useSelector((state) => state.video);
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(currentSearchValue);
  }, [currentSearchValue]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetchFromApi(`search?part=snippet&q=${search}`);
        setVideo(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, [search]);

  return (
    <Box backgroundColor="black" flex={6} p={2}>
      <Grid container spacing={2} columns={24}>
        {video.map((video, index) => (
          <Grid item xs={8}>
            <Card
              sx={{ backgroundColor: "black" }}
              key={index}
              onClick={() => {
                console.log(video);
                navigate("/video", { state: { video: video } });
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image={video.snippet.thumbnails.high.url}
                alt="Paella dish"
              />
              <CardContent>
                <Typography color="white" sx={{ fontSize: "18px" }}>
                  {video.snippet.title}
                </Typography>
                <Typography
                  color="white"
                  sx={{ fontSize: "15px", color: "#d1d5db" }}
                >
                  {video.snippet.channelTitle}
                </Typography>
                {/* <Typography color="white" sx={{ fontSize: "10px" }}>
                  views
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
