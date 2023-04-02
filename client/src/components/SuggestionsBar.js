import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { fetchFromApi } from "../fetchFromApi.js";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export default function SuggestionsBar() {
  const [suggestedVideo, setSuggestedVideo] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetchFromApi(
          `search?part=snippet&q=${"Suggestions"}`
        );
        console.log(response);
        setSuggestedVideo(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, []);

  console.log(suggestedVideo);

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
          square
          sx={{ pb: "50px", backgroundColor: "black", color: "white" }}
        >
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ p: 2, pb: 0 }}
          >
            Suggested Videos
          </Typography>
          <List sx={{ mb: 2 }}>
            {suggestedVideo.map((data, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <Card sx={{ backgroundColor: "black" }} key={index}>
                    <CardMedia
                      component="img"
                      height="194"
                      image={data.snippet.thumbnails.high.url}
                      alt="Paella dish"
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
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Grid>
  );
}
