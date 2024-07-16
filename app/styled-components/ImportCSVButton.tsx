import React from 'react';
import { Text, StyleSheet, Pressable,View } from 'react-native';

export default function ImportCSVButton(props:any) {
  const { onPress, Toptitle = '<Toptitle missing>', Bottomtitle=`<Bottomtitle missing>`, disabled = false, buttonStyle, textStyle } = props;

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
      <View style={{"flex":1,justifyContent:"center",alignItems:"center"}}>

      </View>
      <Text style={[styles.text, textStyle]}>{Toptitle}</Text>
      <Text style={[styles.text, textStyle]}>{Bottomtitle}</Text>
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
    width:"100%"
  },
  buttonPressed: {
    backgroundColor: 'gray',  // Change to a different color when pressed
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',  // Gray color for disabled state
    elevation: 0,
  },
  text: {
    fontSize: 10,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
