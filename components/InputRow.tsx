// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from './Themed';

export default function InputRow({ title, units, value, setFn }: 
    { title: string, units: string, value: string, setFn: any  }) {
  return (
    <View style={styles.container}>
        <Text
          style={styles.prefix}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {title}
        </Text>

        <TextInput 
            style={styles.input} 
            value={value}
            keyboardType='numeric'
            onChangeText={text => setFn(text)}/>

        <Text
          style={styles.suffix}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {units}
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 24, 
    width: "20%",
    borderColor: 'gray', 
    borderWidth: 1
  },
  suffix: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'left',
    paddingHorizontal: "1%"
  },
  prefix: {
    flex: 1,
    width: 100,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'right',
    paddingHorizontal: "1%"
  }
});
