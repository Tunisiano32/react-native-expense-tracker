import React, { useLayoutEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../store/expenseSlice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense);
  const editedExpenseId = route?.params?.expenseId ?? undefined;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      dispatch(
        updateExpense({
          ...expenseData,
          id: editedExpenseId,
        })
      );
    } else {
      dispatch(
        addExpense({
          ...expenseData,
          id: Math.random().toString(),
        })
      );
    }
    navigation.goBack();
  }
  return (
    <View style={styles.conatiner}>
      <ExpenseForm
        cancelHandler={cancelHandler}
        confirmHandler={confirmHandler}
        isEditing={isEditing}
        defaultValue={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteConatiner}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteConatiner: {
    marginTop: 16,
    paddingTop: 18,
    borderTopColor: GlobalStyles.colors.primary100,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
