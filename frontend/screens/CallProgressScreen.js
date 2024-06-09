// screens/CallProgressScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ProgressBarAndroid, Button } from 'react-native';

export default function CallProgressScreen({ route, navigation }) {
  const { pharmacies } = route.params;
  const [currentPharmacyIndex, setCurrentPharmacyIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Starting calls...');

  useEffect(() => {
    // Simulate call progress
    const interval = setInterval(() => {
      if (currentPharmacyIndex < pharmacies.length) {
        setStatusMessage(`Calling ${pharmacies[currentPharmacyIndex].name}...`);
        setCurrentPharmacyIndex(currentPharmacyIndex + 1);
      } else {
        clearInterval(interval);
        setStatusMessage('Calls completed.');
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPharmacyIndex]);

  return (
    <View style={styles.container}>
      <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={currentPharmacyIndex / pharmacies.length} />
      <Text>{statusMessage}</Text>
      {currentPharmacyIndex >= pharmacies.length && (
        <Button
          title="View Summary"
          onPress={() => navigation.navigate('Summary', { pharmacies })}
        />
      )}
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
