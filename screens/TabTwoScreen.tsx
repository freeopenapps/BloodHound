import * as React from 'react';
import { StyleSheet } from 'react-native';

import { LogEntry } from "../types";
import { getAll } from '../db';
import DisplayEntry from '../components/DisplayEntry';
import DisplayRange from '../components/DisplayRange';
import { groupByDate } from '../utils/DateUtils';

import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [dateGroups, setDateGroups] = React.useState<any>({})
  const [entries, setEntries] = React.useState<LogEntry[]>([])

  const [startDate, setStartDate] = React.useState<any>(new Date());
  const [endDate, setEndDate] = React.useState<any>(new Date());
  const isFocused = useIsFocused();

  const genDevEntries = () => {
    let entries = []
    for(let i=0; i<10;i++)
    {
      entries.push(
        {
          'ketones': '1',
          'glucose': '120',
          'weight': '123',
          'systolic': '130',
          'diastolic': '60',
          'bpm': '2',
          'note': 'A note has been made! What now?',
          'datetime': '2021-03-03 04:05:18.000'
        }
      )
    }
    return entries
  }

  const get_date_groups = () => {
    setDateGroups(groupByDate(entries, startDate, endDate))
  }
    
  const defaultRange = () => {
    // Set range to start 7 days ago and end today
    let d = new Date(Date())
    d.setDate( startDate.getDate() - 7 )
    setStartDate(d)
  }

  const getEntries = () => {
    getAll()
      .then((res: any) => { 
        setEntries(res['rows']['_array'])
        // console.log(entries)
        // console.log('Got all entries!')
        })
      .catch((err) => { console.log(err)})
  }

  React.useEffect(()=> {
    isFocused ? getEntries(): undefined;
  }, [isFocused])

  React.useEffect(() => {
    defaultRange()
    getEntries()
    //@ts-ignore
    // setEntries(genDevEntries());
  }, [])

  React.useEffect(() => {
    get_date_groups()
  }, [entries, startDate, endDate])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <DisplayRange 
            start={startDate}
            setStart={setStartDate}
            end={endDate}
            setEnd={setEndDate}/>
        {Object.keys(dateGroups).sort().reverse().map((date, key1) => {
          return (
            <View key={key1}>
              <Text style={styles.title}>{date}</Text>
              {dateGroups[date].map((entry:any, key2:any)=> {
                return <DisplayEntry entry={entry} key={key2}/>
              })}  
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'lightblue',
    marginHorizontal: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  range_title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 60,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: '3%'
  },
  date_row: {
    flex:1,
    flexDirection: 'row',
  }
});
