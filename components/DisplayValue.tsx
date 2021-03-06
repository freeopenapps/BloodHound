import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function DisplayValue({title, value, unit}: {title: string, value: string, unit: string}) {
  return(
    <View style={styles.container}>
      <Text
        style={styles.value_top}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {title}
      </Text>
      <Text
        style={styles.value_mid}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {value === "" ? '-' : value}
      </Text>
      <Text
        style={styles.value_bottom}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {unit}
      </Text>
  </View>
  );
}

let bgColor = '#ddd'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: bgColor,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  value_top: {
    // flex: 1,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center'
  },
  value_mid: {
    // flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center'
  },
  value_bottom: {
    // flex: 1,
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center'
  }
});