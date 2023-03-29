import React from "react";
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

const Sidebar = () => {
  return (
    <Box sx={{ backgroundColor: "black", color: "white" }} flex={1} p={2}>
      <nav>
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
            <ListItemButton>
              <ListItemIcon>
                <SubscriptionsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <EmojiEventsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Sports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AudiotrackIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Music" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SportsEsportsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Gaming" />
            </ListItemButton>
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
          <FormControlLabel disabled control={<Switch />} label="Light" />
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
