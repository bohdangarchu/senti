import React, { useState } from "react";
import { Grid, TextField, Button, Autocomplete } from "@mui/material/";
import Dropdown from "./Dropdown";
import { tickersList } from "../data/tickers";
function StockPicker(props) {
  const [stockTicker, setStockTicker] = useState("");
  const [period, setPeriod] = useState("");

  function handlePeriodChange(time_range) {
    setPeriod(time_range);
  }

  function getStockTicker(companyName) {
    if (companyName) {
      const company = tickersList.find(
        (company) => company.company_name === companyName
      );
      const ticker = company.ticker;
      setStockTicker(ticker);
    }
  }

  return (
    <Grid
      my={10}
      container
      spacing={0.5}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={6}>
        <Autocomplete
          freeSolo
          fullWidth
          id="free-solo-2-demo"
          disableClearable
          options={tickersList.map((option) => option.company_name)}
          onChange={(event, value) => getStockTicker(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find Company"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Dropdown onPeriodChange={handlePeriodChange} period={period} />
      </Grid>
      <Grid
        item
        xs={6}
        sm={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            props.onSearchClick(stockTicker, period);
          }}
        >
          Search!
        </Button>
      </Grid>
    </Grid>
  );
}

export default StockPicker;
