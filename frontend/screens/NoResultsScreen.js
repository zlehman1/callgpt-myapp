import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Screen from '../components/Screen';

const NoResultsScreen = ({ route, navigation }) => {
  const { medication, dosage, location, pharmacies } = route.params;

  const handleStartCalling = () => {
    // Logic to start calling pharmacies
    alert('Start calling pharmacies!');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>All pharmacies near you are out of stock</Text>
        <Button title="Expand Search" onPress={handleStartCalling} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default NoResultsScreen;
