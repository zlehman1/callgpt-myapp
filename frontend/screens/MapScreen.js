// screens/MapScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route, navigation }) {
  const { location, transportationMode, adderallForm } = route.params;

  // Dummy data for pharmacies
  const pharmacies = [
    { id: 1, name: 'Pharmacy 1', latitude: 37.78825, longitude: -122.4324 },
    { id: 2, name: 'Pharmacy 2', latitude: 37.78845, longitude: -122.4358 },
  ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            coordinate={{ latitude: pharmacy.latitude, longitude: pharmacy.longitude }}
            title={pharmacy.name}
          />
        ))}
      </MapView>
      <Button
        title="Start Calling"
        onPress={() => navigation.navigate('CallProgress', { pharmacies })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
