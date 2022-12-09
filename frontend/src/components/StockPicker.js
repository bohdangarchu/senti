import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material/";
import Dropdown from "./Dropdown";
function StockPicker(props) {
  const [companyName, setCompanyName] = useState("");
  const [period, setPeriod] = useState("");

  function handlePeriodChange(time_range) {
    setPeriod(time_range);
  }

  return (
    <Grid
      my={10}
      container
      spacing={0.5}
      alignItems="center"
      direction={{ xs: "column", md: "row" }}
    >
      <Grid item xs={12} lg={6}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Company name"
          variant="outlined"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Dropdown onPeriodChange={handlePeriodChange} period={period} />
      </Grid>
      <Grid
        item
        xs={6}
        lg={2}
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
            props.onSearchClick(companyName, period);
          }}
        >
          Search!
        </Button>
      </Grid>
    </Grid>
  );
}

export default StockPicker;
