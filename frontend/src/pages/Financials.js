import React from "react";
import { Grid, Typography, Box } from "@mui/material/";
import StockPicker from "../components/StockPicker";
function Financials() {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ dispaly: "flex", justifyContent: "center", border: "1" }}
      >
        <StockPicker />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Choose dates and word you are looking for
        </Typography>
        <Box
          sx={{ display: "flex" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          {/* {loading && <CircularProgress size={100} />} */}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Financials;
