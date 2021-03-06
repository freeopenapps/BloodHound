// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Themed';

import DisplayValue from './DisplayValue';
import DisplayDate from './DisplayDate';
import DisplayNote from './DisplayNote';
import Entry from '../objects/Entry';

export default function DisplayEntry({entry}: {entry: Entry}) {
  const convert_time = (datetime: string): string => {
    /**
     * 2021-03-03 04:05:18.000Z ---> 4:05am
     */
    let d = new Date(datetime)

    // Setup date
    let month = d.getMonth() + 1
    let m = month.toString()
    let date = m + '/' + d.getDate() + '/' + d.getFullYear()

    // Setup time
    let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    //@ts-ignore
    let minutes = d.getMinutes().toString().padStart(2,0);
    let suffix = d.getHours() > 11 ? "pm" : "am";

    return date + ' ' + hours + ':' + minutes + suffix;
  }

  const convert_pressure = (sys: string, dia: string, bpm: string): string => {
    return sys + '/' + dia + '/' + bpm;
  }

  return (
    <View style={styles.column_container}>
      <View style={styles.row_container}>
        <DisplayDate value={convert_time(entry['datetime'])} />
        <DisplayValue title='Ketones' value={entry['ketones']} unit="mmol/L"/>
        <DisplayValue title='Glucose' value={entry['glucose']} unit="mg/dL" />
        <DisplayValue title='Weight' value={entry['weight']} unit="lb" />
        <DisplayValue title='Pressure' 
          value={convert_pressure(entry['systolic'],entry['diastolic'],entry['bpm'])} 
          unit="sys/dia/bpm" />
      </View>
      <View style={styles.row_container}>
        <DisplayNote value={entry['note']} />
      </View>
    </View>
  );
}

let bgColor = '#dde'
const styles = StyleSheet.create({
  column_container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    backgroundColor: bgColor,
    borderColor: 'black',
    borderWidth: 1
  },
  row_container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: bgColor,
  }
});
