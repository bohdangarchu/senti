import HomePage from "./components/HomePage";
import React, { useState } from "react";
import { Box, TextField, Grid, Button } from "@mui/material/";
import RangeDatePicker from "./components/RangeDatePicker";

export default function App() {
  const [fetchData, setFetchData] = useState([]);
  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  console.log(fetchData);

  return (
    <>
      <h1>Hello senti!</h1>
      <p>test</p>
      <RangeDatePicker onRangeSelect={handleGenerateClick} />
    </>
  );
}
