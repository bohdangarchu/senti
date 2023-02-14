import React from "react";
import General from "./pages/Generals";
import Financials from "./pages/Financials";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material/";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

export default function App() {
  console.log(process.env.REACT_APP_FINANCIAL_WEEKLY_ENDPOINT);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: 1,
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/nyt-news" element={<General />} />
        <Route path="/financial-news" element={<Financials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}
