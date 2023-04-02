import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import VideoDetail from "./pages/VideoDetail";

function App() {
  const isAuthorised = localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {isAuthorised && <Route path="/home" element={<Home />} />}
        {isAuthorised && <Route path="/video" element={<VideoDetail />} />}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
