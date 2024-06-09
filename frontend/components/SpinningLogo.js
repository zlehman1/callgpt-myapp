import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';

const SpinningLogo = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ rotate: spin }] }]}>
      <Image
        source={{ uri: 'https://assets.api.uizard.io/api/cdn/stream/cc483ad0-34c1-46f4-b4bf-11079aff7423.png' }}
        style={styles.logo}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.17,
  },
  logo: {
    width: 295,
    height: 339,
    resizeMode: 'contain',
  },
});

export default SpinningLogo;
