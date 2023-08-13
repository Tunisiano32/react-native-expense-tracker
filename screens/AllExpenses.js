import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpenses() {
  const expenses = useSelector((state) => state.expense);
  return (
    <ExpensesOutput
      expensesPeriod={"Total"}
      expenses={expenses}
      fallback="No expenses were saved"
    />
  );
}

export default AllExpenses;
