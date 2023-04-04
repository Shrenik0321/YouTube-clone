import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import VideoDetail from "./pages/VideoDetail";
import { Box } from "@mui/material";

function App() {
  const isAuthorised = localStorage.getItem("access_token");

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          {isAuthorised && <Route path="/home/:id" element={<Home />} />}
          {isAuthorised && (
            <Route path="/video/:id/:videoId" element={<VideoDetail />} />
          )}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
