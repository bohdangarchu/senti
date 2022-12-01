import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material/";
function StockPicker() {
  const [companyName, setCompanyName] = useState("");
  console.log(companyName);
  return (
    <Grid my={10} container spacing={0.5} direction="row" alignItems="center">
      <Grid item xs={8} lg={8}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Outlined"
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
          onClick={() => console.log(companyName)}
        >
          Find
        </Button>
      </Grid>
    </Grid>
  );
}

export default StockPicker;
