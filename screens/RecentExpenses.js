import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expenses = useSelector((state) => state.expense);
  const recentExpenses = expenses.filter((expense) => {
    const date7daysAgo = getDateMinusDays(new Date(), 7);
    return expense.date > date7daysAgo;
  });
  return (
    <ExpensesOutput
      expensesPeriod={"Last 7 Days"}
      expenses={recentExpenses}
      fallback="No expenses saved in the last 7 days"
    />
  );
}

export default RecentExpenses;
