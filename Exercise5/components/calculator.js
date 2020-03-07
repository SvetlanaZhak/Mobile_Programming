import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  TextInput,
  Text,
  FlatList
} from "react-native";

const calculator = props => {
  navigationOptions = { title: "Calculator" };
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState();
  const [data, setData] = useState([]);
  const plusPressed = () => {
    setResult(Number(number1) + Number(number2));
    const text = `${number1} + ${number2} = ${Number(number1) +
      Number(number2)}`;
    setData([...data, { key: text }]);
  };
  const minusPressed = () => {
    setResult(number1 - number2);
    const text = `${number1} - ${number2} = ${Number(number1) -
      Number(number2)}`;
    setData([...data, { key: text }]);
    setData([...data, { key: text }]);
  };
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={{
          width: 150,
          borderColor: "gray",
          borderWidth: 1,
          alignItems: "center",
          textAlign: "center"
        }}
        onChangeText={number1 => setNumber1(number1)}
        value={number1}
        keyboardType={"numeric"}
      />
      <TextInput
        style={{
          width: 150,
          borderColor: "gray",
          borderWidth: 1,
          textAlign: "center"
        }}
        onChangeText={number2 => setNumber2(number2)}
        value={number2}
        keyboardType={"numeric"}
      />

      <View style={styles.rowButton}>
        <Button
          style={styles.buttonPlus}
          color="blue"
          onPress={plusPressed}
          title="+"
        />
        <Button
          style={styles.buttonMinus}
          color="blue"
          onPress={minusPressed}
          title="-"
        />
        <Button
          color="blue"
          onPress={() => navigate("History", { data })}
          title="History"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  rowButton: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-between",
    marginTop: "5%"
    // width: "25%"
  },
  buttonPlus: {
    width: "50%"
  },

  buttonMinus: {
    width: "50%"
  }
});

calculator.navigationOptions = ({ navigate }) => ({ title: "Calculator" });

export default calculator;
