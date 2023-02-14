import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  generalSenti: {},
  generalSentiDetails: [],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    receivedGeneralSenti: (state, action) => {
      const sentiData = action.payload;
      return {
        ...state,
        generalSenti: {
          labels: sentiData.map((uniqYear) => uniqYear.date),
          datasets: [
            {
              label: "click on the point to see details",
              data: sentiData.map((uniqYear) => uniqYear.sentiment),
            },
          ],
        },
      };
    },
    receivedGeneralSentiDetails: (state, action) => {
      const sentiDetails = action.payload;
      return {
        ...state,
        generalSentiDetails: sentiDetails,
      };
    },
  },
});

export const { receivedGeneralSenti, receivedGeneralSentiDetails } =
  generalSlice.actions;

export default generalSlice.reducer;
