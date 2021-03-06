import React from 'react';
import { Text, View, TextInput } from './Themed';
import { StyleSheet } from 'react-native';

import Entry from '../objects/Entry';

export default function InputNote({entry, setEntry}: {entry:Entry, setEntry: any}){
  const [value, setValue] = React.useState('');

  const onChange = (val: string) => {
    setValue(val)
    // Create temp with props entry values
    let e_temp: Entry = new Entry(entry.getEntry());

    // Update note attribute
    e_temp.note = val;

    // replace old Entry with e_temp
    setEntry(e_temp)
  }
  return(      
    <View style={styles.container}>
      <Text style={styles.title}>Note</Text>
      <TextInput 
        style={styles.text}
        multiline
        numberOfLines={4}
        value={value}
        onChangeText= {text => onChange(text)}/>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  title: {
    fontSize: 20,
    paddingLeft: "10%",
    fontWeight: 'bold',
  },
  text: {
    height: "80%", 
    width: "80%",
    alignSelf: "center",
    borderColor: 'gray', 
    borderWidth: 1
  }
});