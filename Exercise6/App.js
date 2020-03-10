import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  TextInput,
  Text,
  AsyncStorage
} from "react-native";

export default function App() {
  const [number, setNumber] = useState("");
  const [guessAmount, setGuessAmount] = useState(0);
  const [highscore, setHighScore] = useState(100);
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  useEffect(() => async () => getHighScoreFromPrevieusPlay());

  const [message, setMessage] = useState("Guees a number between 1-100");

  const reset = () => {
    setNumber("");
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setMessage("Guess a number between 1-100");
  };

  const compare = () => {
    if (secretNumber == number) {
      setMessage(`Your guess ${number} is correct`);
      const guesses = guessAmount + 1;
      Alert.alert(`You guessed the number in ${guesses} guesses.`);

      saveData(highscore);
      reset();
    } else if (number > 100 || number < 0) {
      setMessage(`Your number ${number}  is not in the range`);
      setGuessAmount(guessAmount + 1);
    } else if (secretNumber > number) {
      setMessage(`Your guess ${number} is too low`);
      setGuessAmount(guessAmount + 1);
    } else if (secretNumber < number) {
      setMessage(`Your guess ${number} is too high`);
      setGuessAmount(guessAmount + 1);
    } else Alert.alert(`Input valid number between 1-100`);
  };

  const saveData = async highScore => {
    try {
      if (guessAmount + 1 < highScore || highScore === null) {
        await AsyncStorage.setItem(
          "guessAmount",
          JSON.stringify(guessAmount + 1)
        );
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error saving data");
    }
  };

  const getHighScoreFromPrevieusPlay = async () => {
    try {
      const savedCounter = await AsyncStorage.getItem("guessAmount");
      let parsedSavedCounter = JSON.parse(savedCounter);
      setHighScore(parsedSavedCounter);
      console.log("guessAmount", guessAmount);
      console.log("parsedSavedCounter", parsedSavedCounter);
    } catch (error) {
      Alert.alert("Error reading data from storage");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: "20%",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {message}
        </Text>
      </View>

      <TextInput
        style={{
          width: 40,
          borderColor: "gray",
          borderWidth: 1,
          fontWeight: "bold"
        }}
        textAlign="center"
        onChangeText={number => setNumber(number)}
        value={number}
        keyboardType={"numeric"}
      />
      <View
        style={{
          flexDirection: "row",

          marginTop: "20%",
          fontWeight: "bold",
          backgroundColor: "blue"
        }}
      >
        <Button color="white" onPress={compare} title="MAKE GUESS" />
      </View>

      {highscore && <Text>Highscore: {highscore} guesses </Text>}
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
