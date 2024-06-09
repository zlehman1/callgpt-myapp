import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#fa8b6c',
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 31,
    textAlign: 'center',
  },
});

const Text = ({ text }) => {
  return (
    <RNText style={styles.text}>
      {text}
    </RNText>
  );
};

export default Text;
