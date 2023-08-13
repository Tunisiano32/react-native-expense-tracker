import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
