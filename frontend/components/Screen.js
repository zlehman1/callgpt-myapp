import React from 'react';
import { View } from 'react-native';
import sharedStyles from '../styles/shared';

const Screen = (props) => {
  return (
    <View style={sharedStyles.screen}>
      {props.children}
    </View>
  );
};

export default Screen;
