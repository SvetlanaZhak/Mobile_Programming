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

const storeData = async guessAmount => {
  try {
    await AsyncStorage.setItem("highscore", JSON.stringify(guessAmount));
  } catch (err) {
    console.log(error);
  }
};

export default function App() {
  const [number, setNumber] = useState("");
  const [guessAmount, setGuessAmount] = useState(0);
  const [highscore, setHighScore] = useState(100);
  const [secretNumber, setSecretNumber] = useState(
    50
    //Math.floor(Math.random() * 100) + 1
  );

  useEffect(() => {
    const getHighScoreFromPrevieusPlay = async () => {
      try {
        const previous = await AsyncStorage.getItem("highscore");
        if (previous) {
          setHighScore(previous);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHighScoreFromPrevieusPlay();
  }, []);

  const [message, setMessage] = useState("Guees a number between 1-100");

  const reset = () => {
    setNumber("");
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setMessage("Guess a number between 1-100");
    setGuessAmount(0);
  };

  const compare = () => {
    if (secretNumber == number) {
      setMessage(`Your guess ${number} is correct`);
      const guesses = guessAmount + 1;
      Alert.alert(`You guessed the number in ${guesses} guesses.`);
      if (guesses < JSON.parse(highscore)) {
        AsyncStorage.setItem("highscore1", guesses);
        setHighScore(guesses);
      }
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

  return (
    <View style={styles.container}>
      <View style={{ margin: "20%", alignItems: "center" }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
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
      <Text>Highscore: {highscore} </Text>
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
