import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopLogo from '../components/TopLogo';
import Screen from '../components/Screen';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import CustomButton from '../components/CustomButton';

const WelcomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.container}>
        <TopLogo />
        <Title />
        <Subtitle />
        <CustomButton label="Adderall" onPress={() => navigation.navigate('Dosage', { medication: 'Adderall' })} />
        <CustomButton label="Ritalin" onPress={() => navigation.navigate('Dosage', { medication: 'Ritalin' })} />
        <CustomButton label="Vyvanse" onPress={() => navigation.navigate('Dosage', { medication: 'Vyvanse' })} />
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
});

export default WelcomeScreen;
