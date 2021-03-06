import { Text, View, TextInput } from './Themed';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import InputValue from './InputValue';
import InputNote from './InputNote';


export default function InputEntry({entry, setEntry}: {entry: any, setEntry: any}){
  return(      
    <View style={styles.container}>
      <Text style={styles.title}>Entry</Text>
      <InputValue 
        title='Ketones' 
        attribute='ketones'
        units='mmol/L' 
        entry={entry} 
        setEntry={setEntry}/>
      <InputValue 
        title='Glucose' 
        attribute='glucose'
        units='mg/dL' 
        entry={entry} 
        setEntry={setEntry}/>
      <InputValue 
        title='Weight' 
        attribute='weight'
        units='lb' 
        entry={entry} 
        setEntry={setEntry}/>
      <InputValue 
        title='Systolic' 
        attribute='systolic'
        units='mmHg' 
        entry={entry} 
        setEntry={setEntry}/>
      <InputValue 
        title='Diastolic' 
        attribute='diastolic'
        units='mmHg' 
        entry={entry} 
        setEntry={setEntry}/>
      <InputValue 
        title='Bpm' 
        attribute='bpm'
        units='bpm' 
        entry={entry} 
        setEntry={setEntry}/>

      <InputNote entry={entry} setEntry={setEntry} />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  title: {
    fontSize: 20,
    paddingLeft: "10%",
    fontWeight: 'bold',
  },

});