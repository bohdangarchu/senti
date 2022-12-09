import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import MultiLineChart from "../components/Charts/MultiLineChart";
import { fakeData } from "../auxiliary components/fakeData";
export default function Landing() {
  return (
    <Grid container sx={{ flexGrow: 1 }} my={10}>
      <Grid item xs={12} sm={6} sx={{ border: 1 }}>
        <Box>
          <Typography variant="h6" align="center" gutterBottom>
            Senti summarizes news sentiment for a specific topic or stock
          </Typography>
          <Button>Check out!</Button>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ border: 1 }}>
        <MultiLineChart data={fakeData} />
      </Grid>
    </Grid>
  );
}
