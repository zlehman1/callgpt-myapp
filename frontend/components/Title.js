import React from 'react';
import { Text, StyleSheet } from 'react-native';
import sharedStyles from '../styles/shared';

const defaultProps = {
  text: 'Welcome!',
};

const Title = (props) => {
  return (
    <Text style={sharedStyles.title}>
      {props.text ?? defaultProps.text}
    </Text>
  );
};

export default Title;
