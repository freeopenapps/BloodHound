import * as React from 'react';
import { StyleSheet } from 'react-native';

import { getAll } from '../db';
import Entry from '../components/Entry';
import DateButtonCombo from '../components/DateButtonCombo'
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [dateGroups, setDateGroups] = React.useState<any>({})
  const [entries, setEntries] = React.useState([])

  const [startDate, setStartDate] = React.useState<any>(new Date(Date()));
  const [endDate, setEndDate] = React.useState<any>(new Date(Date()));
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
          'datetime': '2021-03-03T04:05:18.000Z'
        }
      )
    }
    return entries
  }

  const get_date_groups = () => {
    let temp: any = {}

    for(const index in entries)
    {
      //@ts-ignore
      let d = new Date(entries[index].datetime)
      // console.log('-')
      // console.log(d)
      // console.log(startDate)
      // console.log(endDate)
      if(d >= startDate && d <= endDate)
      {
        let month = d.getMonth() + 1
        let m = month.toString()
        let date = m + '/' + d.getDate() + '/' + d.getFullYear()
  
        if(date in temp)
        {
          // console.log(temp[date])
          temp[date].push(entries[index])
        }
        else
        {
          temp[date] = [entries[index]]
        }
      }
    }
    //@ts-ignore
    setDateGroups(temp)
  }

  const defaultRange = () => {
    // Set range to today and 7 days ago
    let d = new Date(Date())
    d.setDate( startDate.getDate() - 7 )
    setStartDate(d)
  }

  const getEntries = () => {
    getAll()
      .then((res: any) => { 
        setEntries(res['rows']['_array'])
        // console.log(entries)
        console.log('Got all entries!')
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
  }, [entries])

  React.useEffect(() => {
    get_date_groups()
  }, [startDate, endDate])

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.scrollView}>
        <View style={styles.date_row}>
          <Text style={styles.range_title}>Date Range</Text>
          <DateButtonCombo 
            title='Start Date'
            mode='date'
            date={startDate}
            setDate={setStartDate}
          />
          <DateButtonCombo 
            title='End Date'
            mode='date'
            date={endDate}
            setDate={setEndDate}
          />
        </View>
        {Object.keys(dateGroups).sort().reverse().map((date, key1) => {
          return (
            <View key={key1}>
              <Text style={styles.title}>{date}</Text>
              {dateGroups[date].map((entry:any, key2:any)=> {
                return <Entry entry={entry} key={key2}/>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  range_title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 60,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  date_row: {
    flex:1,
    flexDirection: 'row'
  }
});
