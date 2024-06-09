import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import TopLogo from '../components/TopLogo';
import Subtitle from '../components/Subtitle';
import Autocomplete from '../components/Autocomplete';
import CustomButton from '../components/CustomButton';

const LocationScreen = ({ route, navigation }) => {
  const { medication, dosage } = route.params;
  const [location, setLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePlaceSelected = (place) => {
    setLocation(place.description);
    setShowDropdown(false); // Hide the dropdown after selection
  };

  const handleNext = () => {
    if (!location.trim()) {
      alert('Please enter a valid location.');
      return;
    }
    navigation.navigate('FindingPharmacies', { medication, dosage, location });
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TopLogo />
        <Subtitle text="Where are you located?" />
        <Autocomplete
          placeholder="Type your location here..."
          onPlaceSelected={handlePlaceSelected}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
        />
        <View style={[styles.buttonContainer, showDropdown && { marginTop: 200 }]}>
          <CustomButton label="Next" onPress={handleNext} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LocationScreen;

