import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import BubbleChart from "../components/Charts/BubbleChart";
import bgimage from "../../assets/bgimage.png";
import bg2 from "../../assets/bg2.png";
import gradient from "../../assets/gradient.jpg";
import grad from "../../assets/grad.jpg";
export default function Landing() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: `url(${bgimage})`,
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="lg">
        <Grid container my={10}>
          <Grid
            item
            xs={12}
            sm={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box sx={{ width: "50%" }}>
              <Typography variant="h6" align="left" gutterBottom>
                Senti summarizes news sentiment for a specific topic or stock!
              </Typography>
              <Button variant="contained" size="large">
                Check out!
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <BubbleChart />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
