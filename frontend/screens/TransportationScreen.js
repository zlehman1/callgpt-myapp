import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TransportationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>How do you plan to get to the pharmacy?</Text>
      <Button title="Next" onPress={() => navigation.navigate('FindingPharmacies')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
