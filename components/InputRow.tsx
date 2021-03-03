// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from './Themed';

export default function InputRow({ title, units, value, setFn }: 
    { title: string, units: string, value: string, setFn: any  }) {
  return (
    <View style={styles.container}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {title}
        </Text>

        <TextInput 
            style={styles.input} 
            value={value}
            onChangeText={text => setFn(text)}/>

        <Text
          style={styles.text}
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  input: {
    height: 24, 
    width: "20%",
    borderColor: 'gray', 
    borderWidth: 1
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: "1%"
  }
});
