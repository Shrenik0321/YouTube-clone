import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { fetchFromApi } from "../fetchFromApi.js";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function SuggestionsBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSuggestedSearchValue } = useSelector((state) => state.video);
  const [suggestedVideo, setSuggestedVideo] = useState([]);
  const [suggestedSearch, setSuggestedSearch] = useState("Messi");

  useEffect(() => {
    setSuggestedSearch(currentSuggestedSearchValue);
  }, [currentSuggestedSearchValue]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetchFromApi(
          `search?part=snippet&q=${suggestedSearch}`
        );
        setSuggestedVideo(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, [suggestedSearch]);

  return (
    <Grid x item xs={3}>
      <Box
        sx={{
          maxHeight: "100vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "7px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ef4444",
            borderRadius: "10px",
          },
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            pb: "50px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <Typography
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0, fontSize: "30px" }}
          >
            Suggested Videos
          </Typography>
          {suggestedVideo.map((data, index) => (
            <Card
              key={index}
              sx={{
                backgroundColor: "#27272a",
                width: "300px",
                height: "300px",
                color: "white",
                marginBottom: "20px",
              }}
              onClick={() => {
                const videoId = data.id.videoId;
                navigate(`/video/${id}/${videoId}`, {
                  state: { video: data },
                });
              }}
            >
              <CardMedia
                sx={{ height: 172 }}
                image={data.snippet.thumbnails.high.url}
              />
              <CardContent>
                <Typography color="white" sx={{ fontSize: "18px" }}>
                  {data.snippet.title}
                </Typography>
                <Typography
                  color="white"
                  sx={{ fontSize: "15px", color: "#d1d5db" }}
                >
                  {data.snippet.channelTitle}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </Box>
    </Grid>
  );
}
