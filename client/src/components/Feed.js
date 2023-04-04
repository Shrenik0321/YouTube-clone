import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { fetchFromApi } from "../fetchFromApi.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Feed = () => {
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState("New");
  const { id } = useParams();
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
    <Grid item xs={10}>
      <Box flex={6} p={2}>
        <Grid container spacing={2} columns={24}>
          {video.map((video, index) => (
            <Grid item xs={8}>
              <Card
                sx={{
                  backgroundColor: "#27272a",
                  width: "350px",
                  height: "350px",
                }}
                key={index}
                onClick={() => {
                  const videoId = video.id.videoId;
                  navigate(`/video/${id}/${videoId}`, {
                    state: { video: video },
                  });
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Feed;
