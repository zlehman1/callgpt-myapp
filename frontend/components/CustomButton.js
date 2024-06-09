import React, { useRef, useState } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import sharedStyles from '../styles/shared';

const CustomButton = ({ label, onPress, style }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    HapticFeedback.trigger('impactLight');
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[sharedStyles.button, { transform: [{ scale: scaleAnim }] }, style, { backgroundColor: isPressed ? '#4ab5b9' : '#bde4e6', borderColor: isPressed ? '#5ac8fa' : '#9be3e7' }]}>
        <Text style={[styles.buttonText, { color: isPressed ? '#000000' : '#7f7f7f' }]}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '900',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default CustomButton;
