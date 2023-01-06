import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receivedFinSenti, receivedStockPrice } from "./financialSlice";
import { Container, Grid, Typography, Box } from "@mui/material/";
import StockPicker from "../../components/StockPicker";
import { SingleLineChart } from "../../components/Charts/SingleLineChart";
import { fakeData } from "../../auxiliary components/fakeData";
import { finSentiUrl, stocksUrl } from "../../constans/urls";
import useMultipleFetch from "../../hooks/useMultipleFetch";

function Financials() {
  const [fetchData, setFetchData] = useState([]);
  const [ticker, period] = fetchData;
  const [initialRender, setInitialRender] = useState(true);
  const { getData, loading } = useMultipleFetch(finSentiUrl, stocksUrl);
  const finSentiData = useSelector((state) => state.financial.financialSenti);
  const stockData = useSelector((state) => state.financial.stockPrice);
  const dispatch = useDispatch();

  // console.log(finSentiData);
  // console.log(stockData);
  function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  function handleSearchClick(stockTicker, period) {
    setFetchData([stockTicker, period]);
  }

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      getData(`${ticker}?period=${period}`, stocksUrl).then(
        ([finSenti, stockPrice]) => {
          dispatch(receivedFinSenti(finSenti));
          dispatch(receivedStockPrice([stockPrice, finSenti]));
        }
      );
    }
  }, [fetchData]);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Type compony name and select period
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
          {isEmpty(finSentiData) ? null : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SingleLineChart data={finSentiData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <SingleLineChart data={stockData} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Financials;
