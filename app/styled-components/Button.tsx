import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props:any) {
  const { onPress, title = 'Save', disabled = false, buttonStyle, textStyle } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonStyle,
        pressed && !disabled && styles.buttonPressed,
        disabled && styles.buttonDisabled
      ]}
      onPress={!disabled ? onPress : null}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 5,
  },
  buttonPressed: {
    backgroundColor: 'gray',  // Change to a different color when pressed
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',  // Gray color for disabled state
    elevation: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
