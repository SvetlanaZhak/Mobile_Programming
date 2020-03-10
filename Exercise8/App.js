import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  Button,
  Picker,
  View,
  StyleSheet,
  Alert,
  Image
} from "react-native";

export default function excercise8CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [results, setResults] = useState({});
  const [currency, setCurrency] = useState([]);
  const [convertMoney, setConvertMoney] = useState(0);
  const [selectCurrency, setSelectCurrency] = useState("");
  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = () => {
    let url =
      "http://data.fixer.io/api/latest?access_key=44d289fdee6ca4cbaffe0d1419a94c4c&format=1";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setResults(data.rates);
        setCurrency(Object.keys(data.rates));
      })
      .catch(error => {
        Alert.alert("Error", error.message);
      });
  };

  const convert = () => {
    for (const cur in results) {
      if (selectCurrency == cur) {
        setConvertMoney(parseFloat(parseInt(amount) * results[cur]).toFixed(2));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 182, height: 166 }}
        source={{
          uri: "https://thumbs.dreamstime.com/b/bag-money-euro-2699395.jpg"
        }}
      />
      <Text style={styles.text}>{convertMoney} EUR</Text>

      <View style={styles.picker}>
        <TextInput
          style={{ flex: 1, textAlign: "center", fontSize: "20px" }}
          value={amount}
          placeholder="Amount"
          keyboardType="numeric"
          onChangeText={amount => setAmount(amount)}
        />
        <Picker
          style={{ flex: 1 }}
          selectedValue={selectCurrency}
          onValueChange={itemValue => setSelectCurrency(itemValue)}
        >
          {currency.map((item, key) => (
            <Picker.Item label={item} value={item} key={key}></Picker.Item>
          ))}
        </Picker>
      </View>

      <Button
        // style={{ fontSize: "30px", fontWeight: "bold" }}
        color="black"
        title="CONVERT"
        onPress={() => convert()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    fontSize: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 30
  },

  picker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: 2,
    margin: 4
  },
  result: {
    flex: 2,
    justifyContent: "center",
    fontSize: 30
  }
});
