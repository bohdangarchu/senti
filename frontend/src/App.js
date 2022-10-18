import HomePage from "./components/HomePage";
import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Button } from "@mui/material/";
import RangeDatePicker from "./components/RangeDatePicker";
import LineChart from "./components/LineChart";
import { TestData } from "./components/TestData";
import "../src/App.css";

export default function App() {
  const [fetchData, setFetchData] = useState([]);
  const [testData, setTestData] = useState({});
  const [sentiData, setSentiData] = useState([]);

  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  //date sentiment

  //вариант решения: две кнопки - choose date & show sentiment
  //while date is not picked yet show sentiment is disabled

  useEffect(() => {
    if (typeof fetchData[0] == "string") {
      fetch("/api?keyword=ukraine&start-date=2020-01-01&end-date=2020-09-01")
        .then((response) => response.json())
        .then((json) => {
          setTestData({
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

  // useEffect(() => {
  //   if (typeof fetchData[0] == "string") {
  //     console.log(typeof fetchData[0]);
  //     fetch("/api?keyword=ukraine&start-date=2020-01-01&end-date=2020-09-01")
  //       .then((response) => response.json())
  //       .then((json) => console.log(json));
  //   }
  // }, [fetchData]);

  // function handleTestFetch() {
  //   console.log("handleTestFetch is working");
  //   fetch("/api?keyword=ukraine&start-date=2020-01-01&end-date=2020-09-01")
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }

  console.log(fetchData);

  // fetch(
  //   "/api?keyword=ukraine&start-date=2020-01-01&end-date=2020-09-01"
  // )

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
