import React from "react";
import General from "./pages/Generals";
import Financials from "./pages/Financials";
import Header from "./components/Header";
import { Container } from "@mui/material/";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/financial" element={<Financials />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}
