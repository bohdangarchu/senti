import { configureStore } from "@reduxjs/toolkit";
import generalsReducer from "../pages/generalSlice";
import financialsReducer from "../pages/financialSlice";
export const store = configureStore({
  reducer: {
    generals: generalsReducer,
    financials: financialsReducer,
  },
});
