import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Typography, Box } from "@mui/material/";
import Article from "../components/Article";
import CircularProgress from "@mui/material/CircularProgress";
import RangeDatePicker from "../components/RangeDatePicker";
import useFetch from "../hooks/useFetch";
import { getElementAtEvent } from "react-chartjs-2";
import { SingleLineChart } from "../components/Charts/SingleLineChart";

export default function Generals() {
  const [fetchData, setFetchData] = useState([]);
  const [sentiData, setSentiData] = useState({});
  const [detailsOnDate, setDetailsOnDate] = useState([]);
  const [sentiDataDetails, setSentiDataDetails] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const { get, loading } = useFetch(`/api`);
  const chartRef = useRef();

  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  const handlePointDate = (event) => {
    const point = getElementAtEvent(chartRef.current, event);
    const pointIndex = point[0].index;
    const pointDate = sentiData.labels[pointIndex];
    const yearAndMonth = pointDate.split("-");
    const sentiWord = fetchData[2];
    setDetailsOnDate([yearAndMonth[0], yearAndMonth[1], sentiWord]);
  };

  useEffect(() => {
    setSentiDataDetails({});
    setSentiData({});
    if (initialRender) {
      setInitialRender(false);
    } else {
      get(
        `/nyt-news-sentiment?keyword=${fetchData[2]}&start-date=${fetchData[0]}&end-date=${fetchData[1]}`
      ).then((json) => {
        setSentiData({
          labels: json.map((uniqYear) => uniqYear.date),
          datasets: [
            {
              label: "click on the point to see details",
              data: json.map((uniqYear) => uniqYear.sentiment),
            },
          ],
        });
      });
    }
  }, [fetchData]);

  useEffect(() => {
    if (typeof detailsOnDate[0] == "string") {
      get(
        `/most-negative-articles/${detailsOnDate[0]}/${detailsOnDate[1]}?keyword=${detailsOnDate[2]}`
      ).then((json) => {
        setSentiDataDetails(json);
      });
    }
  }, [detailsOnDate]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <RangeDatePicker onRangeSelect={handleGenerateClick} />
        </Grid>
        <Grid item xs={12}>
          {Object.keys(sentiData).length === 0 &&
          sentiData.constructor === Object ? (
            <Typography variant="h4" align="center" gutterBottom>
              Choose dates and word you are looking for!
            </Typography>
          ) : (
            <SingleLineChart
              data={sentiData}
              onPointClick={handlePointDate}
              ref={chartRef}
            />
          )}
          <Box
            sx={{ display: "flex" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            {loading && <CircularProgress size={100} />}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "column" }} mt={2}>
            {sentiDataDetails.length > 0 && loading == false ? (
              <Box>
                <Typography variant="h5" align="left" gutterBottom>
                  Articles that have the most negative sentiment
                </Typography>
                {sentiDataDetails.map((article) => (
                  <Article
                    key={sentiDataDetails.indexOf(article)}
                    date={article.date}
                    sentiment={article.sentiment}
                    text={article.text}
                    url={article.url}
                  />
                ))}
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
