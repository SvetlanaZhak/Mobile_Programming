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
  const [list, setList] = useState("");
  const [data, setData] = useState([]);

  const addData = () => {
    setData([...data, { key: list }]);
    setList("");
  };
  const deleteData = () => {
    setData([...data, { key: list }]);
    setData([]);
    setList("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          width: 150,
          borderColor: "gray",
          borderWidth: 1,
          alignItems: "center",
          textAlign: "center"
        }}
        onChangeText={list => setList(list)}
        value={list}
      />

      <View style={styles.rowButton}>
        <Button onPress={addData} title="ADD" style={styles.plusPressed} />
        <Button
          onPress={deleteData}
          title="CLEAR"
          style={styles.minusPressed}
        />
      </View>
      <Text>Shopping List</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%"
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
