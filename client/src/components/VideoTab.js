import * as React from "react";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Axios from "../axios.js";
import { useParams } from "react-router-dom";

const VideoTab = ({ video }) => {
  const { id } = useParams();
  async function handleSubscribeClick() {
    try {
      const response = await Axios.post(`/api/user/sub/${id}`, {
        sample: "Hello world",
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Grid item xs={9}>
      <Box>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <Card
            sx={{
              position: "absolute",
              marginLeft: "50px",
              marginRight: "50px",
              marginTop: "25px",
              marginBottom: "25px",
              backgroundColor: "black",
              width: "900px",
              height: "90vh",
              color: "white",
            }}
          >
            <CardMedia
              sx={{ height: 425 }}
              image={video.snippet.thumbnails.high.url}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Typography color="white" sx={{ fontSize: "18px" }}>
                    {video.snippet.title}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    color="white"
                    sx={{ fontSize: "15px", color: "#d1d5db" }}
                  >
                    {video.snippet.channelTitle}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                    onClick={handleSubscribeClick}
                  >
                    Subscribe
                  </Button>
                </Box>
                <Box>
                  <Typography
                    color="white"
                    sx={{ fontSize: "15px", color: "#d1d5db" }}
                  >
                    {video.snippet.publishTime}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Grid>
  );
};

export default VideoTab;
