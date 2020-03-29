import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from "react-native";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("shoppingdb.db");

export default function App() {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists shopping item (id integer primary key not null, product text, amount text);"
      );
    });
    updateList();
  }, []);

  // Save shopping items
  const saveItem = () => {
    db.transaction(
      tx => {
        tx.executeSql("insert into item (product, amount) values (?, ?);", [
          product,
          amount
        ]);
      },
      null,
      updateList
    );
  };

  // Update shopping list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql("select * from item;", [], (_, { rows }) =>
        setItems(rows._array)
      );
    });
  };

  // Delete shopping item
  const deleteItem = id => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from item where id = ?;`, [id]);
      },
      null,
      updateList
    );
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
      <Text style={{ marginTop: 30, fontSize: 20, fontWeight: "bold" }}>
        Shopping List
      </Text>
      <FlatList
        style={{ marginLeft: "5%", marginTop: "5%" }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product} - {item.amount}
            </Text>
            <Text
              style={{ fontSize: 18, color: "#0000ff" }}
              onPress={() => deleteItem(item.id)}
            >
              {" "}
              Bought
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
