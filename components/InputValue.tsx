// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TextInput } from './Themed';
import Entry from '../objects/Entry';

export default function InputValue({ title,attribute, units, entry, setEntry }: 
    { title: string, attribute: string, units: string, entry: Entry, setEntry: any  }) {
  /**
   * Will the Entry object be passed in by copy or by reference?
   */

  const onChange = (val: string) => {
    // Update entry with new alue for attribute
    let e_temp: Entry = Entry.createEmpty();
    e_temp.update(entry.getEntry());
    //@ts-ignore
    e_temp[attribute] = val;
    setEntry(e_temp)
    
    // console.log("\n\nInputValue: " + attribute)
    // console.log(entry)
    // console.log(e_temp)
    // console.log("InputValue\n\n")
  }

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
            //@ts-ignore
            value={entry[attribute]}
            keyboardType='numeric'
            onChangeText={text => onChange(text)}/>

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
