import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Axios from "../axios.js";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VideoTab = ({ video }) => {
  const [subscribeToggle, setSubscribeToggle] = useState(false);
  const { id } = useParams();
  const tokenString = localStorage.getItem("access_token");
  const tokenObject = JSON.parse(tokenString);
  const fromGoogle = tokenObject.fromGoogle;

  useEffect(() => {
    async function fetchSubscribedChannels() {
      try {
        if (fromGoogle) {
          const subscribedChannels = await Axios.post(
            `/api/user/getgooglesub/${id}`,
            {
              id: id,
            }
          );
          subscribedChannels.data.map((data) => {
            if (data === video.snippet.channelTitle) {
              setSubscribeToggle(true);
            }
          });
        } else {
          const subscribedChannels = await Axios.post(
            `/api/user/getsub/${id}`,
            {
              id: id,
            }
          );
          subscribedChannels.data.map((data) => {
            if (data === video.snippet.channelTitle) {
              setSubscribeToggle(true);
            }
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSubscribedChannels();
  }, []);

  async function handleSubscribeClick(channel) {
    if (subscribeToggle === false) {
      try {
        if (fromGoogle) {
          await Axios.post(`/api/user/googlesub/${id}`, {
            id: id,
            channelTitle: channel,
          });
        } else {
          await Axios.post(`/api/user/sub/${id}`, {
            id: id,
            channelTitle: channel,
          });
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        if (fromGoogle) {
          await Axios.post(`/api/user/googleunsub/${id}`, {
            id: id,
            channelTitle: channel,
          });
        } else {
          await Axios.post(`/api/user/unsub/${id}`, {
            id: id,
            channelTitle: channel,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function handleSubscribeToggle() {
    setSubscribeToggle((prev) => !prev);
    if (subscribeToggle === false) {
      toast.success("Successfully subscribed!");
    } else {
      toast.error("Successfully unsubscribed!");
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
              backgroundColor: "#27272a",
              paddingX: "10px",
              paddingBottom: "20px",
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
                <Box sx={{ paddingY: "10px" }}>
                  <Typography color="white" sx={{ fontSize: "18px" }}>
                    {video.snippet.title}
                  </Typography>
                </Box>
                <Box sx={{ paddingY: "5px" }}>
                  <Typography
                    color="white"
                    sx={{ fontSize: "15px", color: "#d1d5db" }}
                  >
                    {video.snippet.channelTitle}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      {subscribeToggle ? (
                        <Box sx={{ paddingY: "10px", marginRight: "25px" }}>
                          <Button
                            variant="contained"
                            sx={{
                              "&:hover": {
                                backgroundColor: "red",
                              },
                            }}
                            onClick={() => {
                              handleSubscribeClick(video.snippet.channelTitle);
                              handleSubscribeToggle();
                            }}
                          >
                            Subscribed
                          </Button>
                        </Box>
                      ) : (
                        <Box sx={{ paddingY: "10px" }}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "red",
                            }}
                            onClick={() => {
                              handleSubscribeClick(video.snippet.channelTitle);
                              handleSubscribeToggle();
                            }}
                          >
                            Subscribe
                          </Button>
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginRight: "10px",
                        }}
                      >
                        <ThumbUpIcon
                          sx={{
                            "&:hover": {
                              color: "red",
                            },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginRight: "10px",
                        }}
                      >
                        <ThumbDownAltIcon
                          sx={{
                            "&:hover": {
                              color: "red",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        paddingY: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        color="white"
                        sx={{ fontSize: "15px", color: "#d1d5db" }}
                      >
                        {video.snippet.publishTime}
                      </Typography>
                    </Box>
                  </Box>
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
