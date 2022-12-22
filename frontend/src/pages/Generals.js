import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  receivedGeneralSenti,
  receivedGeneralSentiDetails,
} from "./generalSlice";
import { Container, Grid, Typography, Box } from "@mui/material/";
import Article from "../components/Article";
import CircularProgress from "@mui/material/CircularProgress";
import RangeDatePicker from "../components/RangeDatePicker";
import useFetch from "../hooks/useFetch";
import { getElementAtEvent } from "react-chartjs-2";
import { SingleLineChart } from "../components/Charts/SingleLineChart";

export default function Generals() {
  const [fetchData, setFetchData] = useState([]);
  const [detailsOnDate, setDetailsOnDate] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  //const [isLoaded, setIsLoaded] = useState(false);
  const { get, loading, isLoaded } = useFetch(`/api`);
  const chartRef = useRef();

  const dispatch = useDispatch();

  const generalSentiData = useSelector((state) => state.generals.generalSenti);
  const generalSentiDetails = useSelector(
    (state) => state.generals.generalSentiDetails
  );

  function handleGenerateClick(fromDate, toDate, word) {
    setFetchData([fromDate, toDate, word]);
  }

  const handlePointDate = (event) => {
    const point = getElementAtEvent(chartRef.current, event);
    const pointIndex = point[0].index;
    const pointDate = generalSentiData.labels[pointIndex];
    const yearAndMonth = pointDate.split("-");
    const sentiWord = fetchData[2];
    setDetailsOnDate([yearAndMonth[0], yearAndMonth[1], sentiWord]);
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      get(
        `/nyt-news-sentiment?keyword=${fetchData[2]}&start-date=${fetchData[0]}&end-date=${fetchData[1]}`
      )
        .then((json) => {
          dispatch(receivedGeneralSenti(json));
        })
        .then(() => setIsLoaded(true));
    }
  }, [fetchData]);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      dispatch(receivedGeneralSentiDetails([]));
      get(
        `/most-negative-articles/${detailsOnDate[0]}/${detailsOnDate[1]}?keyword=${detailsOnDate[2]}`
      ).then((json) => {
        dispatch(receivedGeneralSentiDetails(json));
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
          {isLoaded === false ? (
            <Typography variant="h4" align="center" gutterBottom>
              Choose dates and word you are looking for!
            </Typography>
          ) : (
            <SingleLineChart
              data={generalSentiData}
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
            {generalSentiDetails.length > 0 ? (
              <Box>
                <Typography variant="h5" align="left" gutterBottom>
                  Articles that have the most negative sentiment
                </Typography>
                {generalSentiDetails.map((article) => (
                  <Article
                    key={generalSentiDetails.indexOf(article)}
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
