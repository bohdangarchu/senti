import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  receivedGeneralSenti,
  receivedGeneralSentiDetails,
} from "./generalSlice";
import { Container, Grid, Typography, Box } from "@mui/material/";
import Article from "../../components/Article";
import CircularProgress from "@mui/material/CircularProgress";
import RangeDatePicker from "../../components/RangeDatePicker";
import useFetch from "../../hooks/useFetch";
import { getElementAtEvent } from "react-chartjs-2";
import { SingleLineChart } from "../../components/Charts/SingleLineChart";

export default function Generals() {
  const [fetchData, setFetchData] = useState([]);
  const [detailsOnDate, setDetailsOnDate] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const { get, loading } = useFetch(`/api`);
  const chartRef = useRef();

  const dispatch = useDispatch();
  console.log(process.env);

  const generalSentiData = useSelector((state) => state.generals.generalSenti);
  const generalSentiDetails = useSelector(
    (state) => state.generals.generalSentiDetails
  );

  function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  function handleGenerateClick(fromDate, toDate, word) {
    if (isEmpty(generalSentiData) === false) {
      dispatch(receivedGeneralSenti([]));
    }
    dispatch(receivedGeneralSentiDetails([]));
    setFetchData([fromDate, toDate, word]);
  }

  const handlePointDate = (event) => {
    const point = getElementAtEvent(chartRef.current, event);
    const pointIndex = point[0].index;
    const pointDate = generalSentiData.labels[pointIndex];
    const yearAndMonth = pointDate.split("-");
    const sentiWord = fetchData[2];
    dispatch(receivedGeneralSentiDetails([]));
    setDetailsOnDate([yearAndMonth[0], yearAndMonth[1], sentiWord]);
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      get(
        `/nyt-news-sentiment?keyword=${fetchData[2]}&start-date=${fetchData[0]}&end-date=${fetchData[1]}`
      ).then((json) => {
        dispatch(receivedGeneralSenti(json));
      });
    }
  }, [fetchData]);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
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
          {loading ? (
            <Box
              sx={{ display: "flex" }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              mt={5}
            >
              <CircularProgress size={100} />
            </Box>
          ) : (
            <>
              {isEmpty(generalSentiData) ? null : (
                <SingleLineChart
                  data={generalSentiData}
                  onPointClick={handlePointDate}
                  ref={chartRef}
                />
              )}
            </>
          )}
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
