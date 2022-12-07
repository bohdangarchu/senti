import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material/";
function StockPicker(props) {
  const [companyName, setCompanyName] = useState("");
  console.log(companyName);
  return (
    <Grid
      my={5}
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Grid item xs={8} lg={8}>
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
      <Grid
        item
        xs={4}
        lg={1}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => props.onTickerChange(companyName)}
        >
          Find
        </Button>
      </Grid>
    </Grid>
  );
}

export default StockPicker;
