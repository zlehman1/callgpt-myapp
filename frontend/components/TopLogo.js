import React from 'react';
import { View, Image } from 'react-native';
import sharedStyles from '../styles/shared';

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/cc483ad0-34c1-46f4-b4bf-11079aff7423.png',
};

const TopLogo = (props) => {
  return (
    <View style={sharedStyles.topLogoContainer}>
      <Image
        source={{ uri: props.image ?? defaultProps.image }}
        style={sharedStyles.topLogo}
      />
    </View>
  );
};

export default TopLogo;
