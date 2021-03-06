// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Themed';

import DisplayValue from './DisplayValue';
import DisplayTime from './DisplayTime';
import DisplayNote from './DisplayNote';
import Entry from '../objects/Entry';
import {convert_time} from '../utils/DateUtils';

export default function DisplayEntry({entry}: {entry: Entry}) {
  
  const convert_pressure = (sys: string, dia: string, bpm: string): string => {
    return sys + '/' + dia + '/' + bpm;
  }

  return (
    <View style={styles.column_container}>
      <View style={styles.value_row}>
        <DisplayTime value={convert_time(entry['datetime'])} />
        <DisplayValue title='Ketones' value={entry['ketones']} unit="mmol/L"/>
        <DisplayValue title='Glucose' value={entry['glucose']} unit="mg/dL" />
        <DisplayValue title='Weight' value={entry['weight']} unit="lb" />
        <DisplayValue title='Pressure' 
          value={convert_pressure(entry['systolic'],entry['diastolic'],entry['bpm'])} 
          unit="sys/dia/bpm" />
      </View>
      <View style={styles.note_row}>
        <DisplayNote value={entry['note']} />
      </View>
    </View>
  );
}

let bgColor = '#eee'
const styles = StyleSheet.create({
  column_container: {
    // flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'baseline',
    backgroundColor: bgColor,
    borderColor: 'black',
    borderWidth: 1,
  },
  value_row: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: bgColor,
    width: '98%',
  },
  note_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: bgColor,
  }
});
