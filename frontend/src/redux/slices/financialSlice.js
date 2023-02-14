import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  financialSenti: {},
  stockPrice: {},
};

const financialSlice = createSlice({
  name: "financial",
  initialState,
  reducers: {
    receivedFinSenti: (state, action) => {
      const finSenti = action.payload;
      return {
        ...state,
        financialSenti: {
          labels: finSenti.map((uniqYear) => uniqYear.date),
          datasets: [
            {
              label: "Financial Senti",
              data: finSenti.map((uniqYear) => uniqYear.sentiment),
            },
          ],
        },
      };
    },
    receivedStockPrice: (state, action) => {
      const [stockPrice, finSenti] = action.payload;
      const weeklyTimeSeries = stockPrice["Weekly Time Series"];
      const finSentiDates = finSenti.map((el) => el.date);

      function getYearMonthDate(fullDate) {
        return fullDate
          .split("")
          .filter((el, i) => i <= 6)
          .join("");
      }

      function dicToList(dic) {
        let list = [];
        for (let key in dic) {
          list.push({ date: key, value: dic[key] });
        }
        return list;
      }

      function getProperStockPairs(stockDates, sentiDates) {
        return stockDates.filter((stockDates) =>
          sentiDates.some(
            (sentiDate) => sentiDate == getYearMonthDate(stockDates.date)
          )
        );
      }

      function getStockDatePrice(propStockPairs) {
        let stockDatePrice = propStockPairs.map((stockPair) => {
          return {
            date: stockPair.date,
            price: stockPair.value["4. close"],
          };
        });
        return stockDatePrice.reverse();
      }
      const stockList = dicToList(weeklyTimeSeries);
      const sentiYearMonth = finSentiDates.map((el) => getYearMonthDate(el));
      const properStockPairs = getProperStockPairs(stockList, sentiYearMonth);
      const stockDatePrice = getStockDatePrice(properStockPairs);

      return {
        ...state,
        stockPrice: {
          labels: stockDatePrice.map((uniqYear) => uniqYear.date),
          datasets: [
            {
              label: "Stock Price",
              data: stockDatePrice.map((uniqYear) => uniqYear.price),
            },
          ],
        },
      };
    },
  },
});

export const { receivedFinSenti, receivedStockPrice } = financialSlice.actions;

export default financialSlice.reducer;
