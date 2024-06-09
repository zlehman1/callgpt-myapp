import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Subtitle = ({ text, style }) => {
  return <Text style={[styles.subtitle, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    color: '#fa8b6c',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 23,
  },
});

export default Subtitle;

