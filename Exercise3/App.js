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

export default function App() {
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
        <Button onPress={plusPressed} title="+" style={styles.plusPressed} />
        <Button onPress={minusPressed} title="-" style={styles.minusPressed} />
      </View>
      <Text>History</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70%"
  },
  rowButton: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  plusPressed: {
    width: "50%"
  },

  minusPressed: {
    width: "50%"
  }
});
