import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function DisplayNote ({value}:{value: string}) {
  return (      
    <View style={styles.container}>
      <Text
        style={styles.text}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {value}
      </Text>
    </View>);
}

let bgColor = '#eee'
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: bgColor,
  },
  text: {
    // flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  }
});