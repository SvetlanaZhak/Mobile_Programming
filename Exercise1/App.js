import React, { useState } from "react";
import { StyleSheet, View, Button, Alert, TextInput, Text } from "react-native";

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState();
  const plus = () => {
    setResult(Number(number1) + Number(number2));
  };
  const minus = () => {
    setResult(number1 - number2);
  };
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={{ width: 150, borderColor: "gray", borderWidth: 1 }}
        onChangeText={number1 => setNumber1(number1)}
        value={number1}
        keyboardType={"numeric"}
      />
      <TextInput
        style={{ width: 150, borderColor: "gray", borderWidth: 1 }}
        onChangeText={number2 => setNumber2(number2)}
        value={number2}
        keyboardType={"numeric"}
      />
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <Button onPress={plus} title="+" />
        <Button onPress={minus} title="-" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
