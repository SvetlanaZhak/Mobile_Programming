import React from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";

const history = props => {
  navigationOptions = { title: "History" };
  const { data } = props.navigation.state.params;
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>
        History
        {"\n"}
      </Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%"
  }
});
history.navigationOptions = ({ navigate }) => ({ title: "History" });

export default history;
