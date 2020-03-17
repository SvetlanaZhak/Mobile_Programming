import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });

  const getMap = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/batch?key=BKAAGIq0BEG0G126V6n7NYIBbvxK6K5G&location=${address}`
    )
      .then(response => response.json())
      .then(responseJson => {
        setRegion({
          latitude: responseJson.results[0].locations[0].displayLatLng.lat,
          longitude: responseJson.results[0].locations[0].displayLatLng.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        });
      })

      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <MapView style={{ flex: 1 }} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}
        />
      </MapView>
      <View style={styles.container}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder="Enter Address"
          value={address}
          onChangeText={address => setAddress(address)}
        />
      </View>
      <View>
        <Button title="Show" onPress={getMap} />
      </View>
      <View style={{ marginBottom: "10%" }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }
});
