import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";
import * as firebase from "firebase";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDgVeFp8yRZrpAZSMYgqnKl6xMvXP13i14",
    authDomain: "shoppinglist-de911.firebaseapp.com",
    databaseURL: "https://shoppinglist-de911.firebaseio.com",
    projectId: "shoppinglist-de911",
    storageBucket: "shoppinglist-de911.appspot.com",
    messagingSenderId: "721159597885",
    appId: "1:721159597885:web:6060e4a7827c3978d71f54",
    measurementId: "G-2RN3D67C37"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref("items/")
      .on("value", snapshot => {
        const data = snapshot.val() ? snapshot.val() : {};
        const shopItem = Object.values(data);
        setItems(shopItem);
      });
  }, []);

  // Save shopping items
  const saveItem = () => {
    firebase
      .database()
      .ref("items/")
      .push({ product: product, amount: amount });
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Product"
        style={{
          marginTop: 30,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          textAlign: "center"
        }}
        onChangeText={product => setProduct(product)}
        value={product}
      />

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        style={{
          marginTop: 10,
          marginBottom: 5,
          fontSize: 18,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          textAlign: "center"
        }}
        onChangeText={amount => setAmount(amount)}
        value={amount}
      />

      <Button onPress={saveItem} title="Save" />
      <Text
        style={{
          marginTop: 30,
          fontSize: 20,
          fontWeight: "bold"
        }}
      >
        Shopping List
      </Text>
      <FlatList
        style={{
          marginLeft: "5%",
          marginTop: "5%"
        }}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product} - {item.amount}
            </Text>
          </View>
        )}
        data={items}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
