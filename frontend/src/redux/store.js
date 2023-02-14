import { configureStore } from "@reduxjs/toolkit";
import generalsReducer from "./slices/generalSlice";
import financialsReducer from "./slices/financialSlice";
export const store = configureStore({
  reducer: {
    general: generalsReducer,
    financial: financialsReducer,
  },
});
