import React from "react";
import General from "./pages/Generals";
import Financials from "./pages/Financials";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material/";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/nyt-news" element={<General />} />
          <Route path="/financial-news" element={<Financials />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}
