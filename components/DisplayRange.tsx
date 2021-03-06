import * as React from 'react';
import { StyleSheet } from 'react-native';

import DTPicker from '../components/DTPicker';
import { View, Text } from 'react-native';

export default function DisplayRange({start, setStart, end, setEnd}:
  {start: Date, setStart: any, end: Date, setEnd: any}) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date Range</Text>
        <DTPicker 
          title='Start Date'
          mode='date'
          date={start}
          setDate={setStart}
        />
        <DTPicker 
          title='End Date'
          mode='date'
          date={end}
          setDate={setEnd}
        />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
 title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 60,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: '3%'
  }
});