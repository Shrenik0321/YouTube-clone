import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
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
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { Grid, Paper } from "@mui/material";

const Sidebar = () => {
  const [searchButton, setSearchButton] = useState("");
  const dispatch = useDispatch();

  function handleClick(e) {
    setSearchButton(e.target.textContent);
    console.log(searchButton);
  }

  useEffect(() => {
    dispatch(fetchSearchedVideos(searchButton));
  }, [searchButton]);

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
          sx={{ pb: "50px", backgroundColor: "black", color: "white" }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ExploreIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Explore" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Accordion sx={{ backgroundColor: "black", color: "white" }}>
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
                    <ListItem>
                      <Typography>Subscription 1</Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>Subscription 2</Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>Subscription 3</Typography>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <EmojiEventsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Sports" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <AudiotrackIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Music" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <SportsEsportsIcon sx={{ color: "white" }} value="Gaming" />
                </ListItemIcon>
                <ListItemText primary="Gaming" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Accordion sx={{ backgroundColor: "black", color: "white" }}>
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
                    <ListItem>
                      <Typography>Channel 1</Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>Channel 2</Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>Channel 3</Typography>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <VideoLibraryIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Libraries" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HistoryIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FlagIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Report" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Grid>
  );
};

export default Sidebar;
