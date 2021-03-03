// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LogEntry } from '../db';
import { Text, View, TextInput } from './Themed';

export default function Entry({entry}: {entry: any}) {
  const [values, setValues] = React.useState({})
  
  React.useEffect(() => {
    setValues(entry)
  }, [])

  return (
    <View style={styles.container}>
      { Object.entries(values).map((vals: any, index: number) => {
          return <Text
                  key={index}
                  style={styles.text}
                  lightColor="rgba(0,0,0,0.8)"
                  darkColor="rgba(255,255,255,0.8)">
                  {vals[0]}: {vals[1]}
                </Text>
      })}
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
  text: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: "1%"
  }
});
