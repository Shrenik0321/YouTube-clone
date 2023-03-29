import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Axios from "../axios.js";
import { fetchFromApi } from "../fetchFromApi.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncVideos } from "../redux/videoSlice.js";

const Feed = () => {
  const dispatch = useDispatch();
  const [video, setVideo] = useState([]);
  const [search, setSearch] = useState("New");
  const { currentSearchValue } = useSelector((state) => state.video);
  // setSearch(currentSearchValue);

  useEffect(() => {
    dispatch(fetchAsyncVideos());
    // setVideo(response);
    // async function fetchVideos() {
    //   try {
    //     const response = await fetchFromApi(`search?part=snippet&q=${search}`);
    //     setVideo(response);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    // fetchVideos();
  }, []);
  console.log(currentSearchValue);
  // console.log(video);
  return (
    <Box backgroundColor="black" flex={6} p={2}>
      <Grid container spacing={2} columns={24}>
        {video.map((video) => (
          <Grid item xs={8}>
            <Card sx={{ backgroundColor: "black" }}>
              <CardContent>
                <Typography color="white" sx={{ fontSize: "20px" }}>
                  {video.snippet.channelTitle}
                </Typography>
                <Typography color="white" sx={{ fontSize: "15px" }}>
                  {video.snippet.description}
                </Typography>
                <Typography color="white" sx={{ fontSize: "10px" }}>
                  views
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
