// screens/SummaryScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Results({ route, navigation }) {
  const { pharmacies } = route.params;

  return (
    <View style={styles.container}>
      <Text>Call Summary:</Text>
      {pharmacies.map((pharmacy) => (
        <Text key={pharmacy.id}>{pharmacy.name}</Text>
      ))}
      <Button
        title="Retry Unsuccessful Calls"
        onPress={() => navigation.navigate('CallProgress', { pharmacies })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
