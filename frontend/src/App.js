import HomePage from "./components/HomePage";
import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@mui/material/";
import RangeDatePicker from "./components/RangeDatePicker";
import LineChart from "./components/LineChart";
import { TestData } from "./components/TestData";
import "../src/App.css";

export default function App() {
  const [fetchData, setFetchData] = useState([]);
  const [testData, setTestData] = useState({});

  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  useEffect(() => {
    if (typeof fetchData[0] == "string") {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(() => {
          setTestData({
            labels: TestData.map((data) => data.year),
            datasets: [
              {
                label: "Users Gained",
                data: TestData.map((data) => data.userGain),
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

  console.log(fetchData);

  return (
    <Container maxWidth="md" sx={{ bgcolor: "white", minHeight: "100vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <RangeDatePicker onRangeSelect={handleGenerateClick} />
        </Grid>
        <Grid item xs={12}>
          {Object.keys(testData).length === 0 &&
          testData.constructor === Object ? (
            <Typography variant="h4" align="center">
              Choose dates and word you are looking for{" "}
            </Typography>
          ) : (
            <LineChart chartData={testData} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
