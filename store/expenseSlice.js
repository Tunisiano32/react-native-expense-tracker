import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: [
    {
      id: "e1",
      description: "pair of ZSSS",
      amount: 59.99,
      date: new Date("2023-8-10"),
    },
    {
      id: "e2",
      description: "iPad Pro",
      amount: 859.99,
      date: new Date("2023-8-9"),
    },
    {
      id: "e3",
      description: "Groceries",
      amount: 159.99,
      date: new Date("2023-6-10"),
    },
    {
      id: "e4",
      description: "Gas",
      amount: 34.99,
      date: new Date("2023-6-17"),
    },
    {
      id: "e5",
      description: "Bananas",
      amount: 10.99,
      date: new Date("2023-6-18"),
    },
  ],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
