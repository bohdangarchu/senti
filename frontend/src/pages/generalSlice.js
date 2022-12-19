import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {
  generals: {},
};

const generalSlice = createSlice({
  name: "generals",
  initialState,
  reducers: {
    receivedGeneralSenti: (state, action) => {
      const sentiData = action.payload;
      // state.generals.labels = sentiData.map((uniqYear) => uniqYear.date);
      // state.generals.datasets.data = sentiData.map(
      //   (uniqYear) => uniqYear.sentiment
      // );
      //  let generals = state.generals;
      return {
        ...state.generals,
        labels: sentiData.map((uniqYear) => uniqYear.date),
        datasets: [
          {
            label: "click on the point to see details",
            data: sentiData.map((uniqYear) => uniqYear.sentiment),
          },
        ],
      };
      //  console.log(current(state), current(generals));
      // return generals;
      //      state.generals = sentiData;
      // push({
      //   labels: sentiData.map((uniqYear) => uniqYear.date),
      //   datasets: [
      //     {
      //       label: "click on the point to see details",
      //       data: sentiData.map((uniqYear) => uniqYear.sentiment),
      //     },
      //   ],
      // });
    },
  },
});

export const { receivedGeneralSenti } = generalSlice.actions;

export default generalSlice.reducer;
