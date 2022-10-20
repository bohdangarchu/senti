import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box } from "@mui/material/";
import RangeDatePicker from "./components/RangeDatePicker";
import LineChart from "./components/LineChart";
import CircularProgress from "@mui/material/CircularProgress";
import "../src/App.css";
import useFetch from "./hooks/useFetch";

export default function App() {
  const [fetchData, setFetchData] = useState([]);
  const [sentiData, setSentiData] = useState({});
  const { get, post, loading } = useFetch(`/api?keyword=`);
  console.log(loading);

  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  useEffect(() => {
    if (typeof fetchData[0] == "string") {
      get(
        `${fetchData[2]}&start-date=${fetchData[0]}&end-date=${fetchData[1]}`
      ).then((json) => {
        console.log(json);
        setSentiData({
          labels: json.map((uniqYear) => uniqYear.date),
          datasets: [
            {
              label: "sentiment to the word according to New York Times",
              data: json.map((uniqYear) => uniqYear.sentiment),
              backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        });
      });
    }
  }, [fetchData]);

  return (
    <Container maxWidth="md" sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <RangeDatePicker onRangeSelect={handleGenerateClick} />
        </Grid>
        <Grid item xs={12}>
          {Object.keys(sentiData).length === 0 &&
          sentiData.constructor === Object ? (
            <Typography variant="h4" align="center">
              Choose dates and word you are looking for
            </Typography>
          ) : (
            <LineChart chartData={sentiData} />
          )}
          <Box
            sx={{ display: "flex" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={10}
          >
            {loading && <CircularProgress size={100} />}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
