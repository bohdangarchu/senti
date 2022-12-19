import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material/";
import StockPicker from "../components/StockPicker";
import MultiLineChart from "../components/Charts/MultiLineChart";
import { fakeData } from "../auxiliary components/fakeData";

function Financials() {
  const [fetchData, setFetchData] = useState([]);
  const [initialRender, setInitialRender] = useState(true);

  function handleSearchClick(stockTicker, period) {
    setFetchData([stockTicker, period]);
  }

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      console.log(fetchData);
    }
  }, [fetchData]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Type compony name and select period!!!!
          </Typography>
          <Box
            sx={{ display: "flex" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          ></Box>
        </Grid>
        <Grid item xs={12}>
          <StockPicker onSearchClick={handleSearchClick} />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <MultiLineChart data={fakeData} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Financials;
