import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";

import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({
  isEditing,
  cancelHandler,
  confirmHandler,
  defaultValue,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue?.amount?.toString() ?? "",
      isValid: true,
    },
    date: {
      value: getFormattedDate(defaultValue?.date) ?? "",
      isValid: true,
    },
    description: {
      value: defaultValue?.description ?? "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      confirmHandler(expenseData);
    } else {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      Alert.alert("Invalid input", "Please check your input values");
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            value: inputs.amount.value,
            keyboardType: "decimal-pad",
            onChangeText: (enteredValue) =>
              inputChangedHandler("amount", enteredValue),
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            value: inputs.date.value,
            placeholder: "YYYY-MM-DD",
            onChangeText: (enteredValue) =>
              inputChangedHandler("date", enteredValue),
            maxLength: 10,
          }}
          style={styles.rowInput}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            value: inputs.description.value,
            onChangeText: (enteredValue) =>
              inputChangedHandler("description", enteredValue),
            multiline: true,
          }}
          style={styles.rowInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
