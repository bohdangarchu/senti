import React, { useState, useEffect, useRef } from "react";
import { Grid, Container, Typography, Box } from "@mui/material/";
import RangeDatePicker from "./components/RangeDatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import "../src/App.css";
import useFetch from "./hooks/useFetch";
import { Line, getElementAtEvent } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { options } from "./components/options";

export default function App() {
  const [fetchData, setFetchData] = useState([]);
  const [sentiData, setSentiData] = useState({});
  const [detailsOnDate, setDetailsOnDate] = useState([]);
  const { get, loading } = useFetch(`/api?keyword=`);
  const chartRef = useRef();

  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  const handlePointDate = (event) => {
    const point = getElementAtEvent(chartRef.current, event);
    const pointIndex = point[0].index;
    const pointDate = sentiData.labels[pointIndex];
    const sentiWord = fetchData[2];
    setDetailsOnDate([pointDate, sentiWord]);
  };

  console.log(detailsOnDate);

  useEffect(() => {
    if (typeof fetchData[0] == "string") {
      get(
        `${fetchData[2]}&start-date=${fetchData[0]}&end-date=${fetchData[1]}`
      ).then((json) => {
        setSentiData({
          labels: json.map((uniqYear) => uniqYear.date),
          datasets: [
            {
              label: "sentiment to the word according to New York Times",
              data: json.map((uniqYear) => uniqYear.sentiment),
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
              Choose dates and word you are looking for!
            </Typography>
          ) : (
            // <LineChart chartData={sentiData} onClick={handlePointDate} />
            <Line
              ref={chartRef}
              data={sentiData}
              onClick={handlePointDate}
              options={options}
            />
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
