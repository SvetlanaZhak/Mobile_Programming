import React, { useState } from "react";
import { StyleSheet, View, Button, Alert, TextInput, Text } from "react-native";

export default function App() {
  const [number, setNumber] = useState("");
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const [message, setMessage] = useState("Guees a number between 1-100");
  const [guessAmount, setGuessAmount] = useState(0);

  const reset = () => {
    setNumber("");
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setMessage("Guess a number between 1-100");
    setGuessAmount(0);
  };
  const compare = () => {
    if (secretNumber == number) {
      setMessage(`Your guess ${number} is correct`);
      Alert.alert(`You guessed the number in ${guessAmount} guesses.`);
      reset();
    } else if (secretNumber > number) {
      setMessage(`Your guess ${number} is too low`);
      setGuessAmount(guessAmount + 1);
    } else if (secretNumber < number) {
      setMessage(`Your guess ${number} is too high`);
      setGuessAmount(guessAmount + 1);
    } else Alert.alert(`Input valid number between 1-100`);
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: "30%" }}>
        <Text>{message}</Text>
      </View>

      <TextInput
        style={{ width: 30, borderColor: "gray", borderWidth: 1 }}
        onChangeText={number => setNumber(number)}
        value={number}
        keyboardType={"numeric"}
      />
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "black",
          marginTop: "20%"
        }}
      >
        <Button onPress={compare} title="MAKE GUESS" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
    marginTop: "50%"
  }
});
