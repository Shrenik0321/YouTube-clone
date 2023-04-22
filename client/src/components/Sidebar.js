import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchSearchedVideos } from "../redux/videoSlice.js";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { Button, Grid, Paper } from "@mui/material";
import Axios from "../axios.js";
import { useParams, useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Sidebar = () => {
  const { id } = useParams();
  const [searchButton, setSearchButton] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [subscribedChannelsList, setSubscribedChannelsList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(e) {
    setSearchButton(e.target.textContent);
  }

  async function handleDelete() {
    try {
      const response = await Axios.delete(`/api/user/${id}`, {
        id: id,
      });
      if (response != null) {
        localStorage.removeItem("access_token");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    dispatch(fetchSearchedVideos(searchButton));
  }, [searchButton]);

  useEffect(() => {
    async function fetchSubscribedChannels() {
      try {
        const tokenString = localStorage.getItem("access_token");
        const tokenObject = JSON.parse(tokenString);
        const fromGoogle = tokenObject.fromGoogle;
        if (fromGoogle) {
          const subscribedChannels = await Axios.post(
            `/api/user/getgooglesub/${id}`,
            {
              id: id,
            }
          );
          setSubscribedChannelsList(subscribedChannels.data);
        } else {
          const subscribedChannels = await Axios.post(
            `/api/user/getsub/${id}`,
            {
              id: id,
              token: tokenObject.token,
            }
          );
          setSubscribedChannelsList(subscribedChannels.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSubscribedChannels();
  }, []);

  return (
    <Grid x item xs={2}>
      <Box
        sx={{
          maxHeight: "85vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
        }}
      >
        <Paper
          square
          sx={{
            pb: "50px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <List>
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <ExploreIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Accordion
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <AccordionSummary>
                  <ListItemIcon>
                    <SubscriptionsIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Subscriptions" />
                  <ListItemIcon>
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {subscribedChannelsList.map((data, index) => (
                      <ListItem onClick={handleClick}>
                        <Button>{data}</Button>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <EmojiEventsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Sports" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <AudiotrackIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Music" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <SportsEsportsIcon sx={{ color: "white" }} value="Gaming" />
                </ListItemIcon>
                <ListItemText primary="Gaming" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Accordion
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <AccordionSummary>
                  <ListItemIcon>
                    <SmartDisplayIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Channels" />
                  <ListItemIcon>
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem onClick={handleClick}>
                      <Button>Mr.Beast</Button>
                    </ListItem>
                    <Divider sx={{ backgroundColor: "white" }} />
                    <ListItem onClick={handleClick}>
                      <Button>Sidemen</Button>
                    </ListItem>
                    <Divider sx={{ backgroundColor: "white" }} />
                    <ListItem onClick={handleClick}>
                      <Button>Juice WRLD</Button>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem disablePadding>
              <Accordion
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <AccordionSummary>
                  <ListItemIcon>
                    <ThumbUpIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Liked" />
                  <ListItemIcon>
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                </AccordionSummary>
                <AccordionDetails>
                  <List></List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
            <ListItem disablePadding>
              <Accordion
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <AccordionSummary>
                  <ListItemIcon>
                    <ThumbDownAltIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Disliked" />
                  <ListItemIcon>
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                </AccordionSummary>
                <AccordionDetails>
                  <List></List>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <FlagIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                  <DeleteIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "red" }} primary="Delete user" />
              </ListItemButton>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Are you sure you want to Delete user?
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 5, justifyContent: "center" }}
                  >
                    <Button variant="contained" onClick={handleDelete}>
                      Confirm
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Sidebar;
