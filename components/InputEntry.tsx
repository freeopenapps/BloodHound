import { Text, View, TextInput } from './Themed';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import InputValue from './InputValue';
import InputNote from './InputNote';
import DTPicker from './DTPicker';

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
      
      <View style={styles.datetime_row}>
        <DTPicker 
          title='Set Date'
          mode='date'
          entry={entry} 
          setEntry={setEntry}
        />
        <DTPicker
          title='Set Time'
          mode='time'
          entry={entry} 
          setEntry={setEntry}
        />
      </View>
    </View>
    
    )
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
  datetime_row: {
    flex: 1,
    flexDirection: 'row',
    padding: "1%"
  },
});