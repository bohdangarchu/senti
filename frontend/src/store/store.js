import { configureStore } from "@reduxjs/toolkit";
import generalsReducer from "../pages/Generals/generalSlice";
import financialsReducer from "../pages/Financials/financialSlice";
export const store = configureStore({
  reducer: {
    general: generalsReducer,
    financial: financialsReducer,
  },
});
