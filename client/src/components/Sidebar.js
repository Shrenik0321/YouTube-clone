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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { fetchSearchedVideos } from "../redux/videoSlice.js";
import { useSelector, useDispatch } from "react-redux";

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
    <Box flex={1} p={2}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <ExploreIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <SubscriptionsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItemButton>
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

          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <VideoLibraryIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Libraries" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <HistoryIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <FlagIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItemButton>
          </ListItem>
          <FormControlLabel disabled control={<Switch />} label="Light" />
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
