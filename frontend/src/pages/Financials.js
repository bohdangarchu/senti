import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material/";
import StockPicker from "../components/StockPicker";
import MultilineChart from "../components/MultilineChart";
import useFetch from "../hooks/useFetch";

function Financials() {
  const [ticker, setTicker] = useState("");
  const { get, loading } = useFetch("/api");
  const [stockData, setStockData] = useState();
  function handleTickerChange(tckr) {
    setTicker(tckr);
  }

  useEffect(() => {
    Promise.all([
      fetch(
        "nyt-news-sentiment?keyword=nvidia&start-date=01-01-2021&end-date=01-12-2021"
      ),
      fetch("financial-news-sentiment/stocks/nvda"),
    ])
      .then(([newsSenti, stockSenti]) =>
        Promise.all([newsSenti.json(), stockSenti.json()])
      )
      .then(([newsSenti, stockSenti]) => console.log(newsSenti, stockSenti));
  }, [ticker]);
  return (
    <Grid container>
      <Grid item xs={12} mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Choose dates and word you are looking for
        </Typography>
        <Box
          sx={{ display: "flex" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* {loading && <CircularProgress size={100} />} */}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <StockPicker onTickerChange={handleTickerChange} />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{ display: "flex" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <MultilineChart />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Financials;
