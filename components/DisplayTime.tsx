import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function DisplayTime({value}: {value: string}) {
  return(
    <View style={styles.container}>
      <Text
        style={styles.text}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {value}
      </Text>
  </View>
  );
}

let bgColor = '#dde'
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    backgroundColor: bgColor,
    borderColor: 'black',
    borderWidth: 0.5
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    alignContent: 'center',
    alignItems:'center',
    padding: '2%',
    marginTop: '25%'
  }
});