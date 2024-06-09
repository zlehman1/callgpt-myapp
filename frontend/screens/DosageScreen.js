import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopLogo from '../components/TopLogo';
import Screen from '../components/Screen';
import Subtitle from '../components/Subtitle';
import CustomButton from '../components/CustomButton';

const DosageScreen = ({ route, navigation }) => {
  const { medication } = route.params;

  const dosages = {
    Adderall: ['10mg IR', '20mg IR', '20mg XR', '30mg XR'],
    Ritalin: ['5mg IR', '10mg IR', '20mg IR', '10mg XR', '20mg XR', '30mg XR', '40mg XR'],
    Vyvanse: ['20 mg', '30 mg', '40 mg', '50 mg', '60 mg', '70 mg'],
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TopLogo />
        <Subtitle text={`Which dosage of ${medication} are you looking for?`} />
        <View style={styles.buttonContainer}>
          {dosages[medication].map((dosage) => (
            <CustomButton
              key={dosage}
              label={dosage}
              onPress={() => navigation.navigate('Location', { medication, dosage })}
              style={styles.button}
            />
          ))}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center buttons within the container
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: 100, // Adjust width if needed
    height: 50, // Adjust height if needed
    marginVertical: 8,
    marginHorizontal: 10,
  },
});

export default DosageScreen;
