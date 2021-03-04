import * as React from 'react';
import { StyleSheet } from 'react-native';

import { getAll } from '../db';
import Entry from '../components/Entry';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

export default function TabTwoScreen() {
  const [dateGroups, setDateGroups] = React.useState<any>({})
  const [entries, setEntries] = React.useState([])

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
          'note': 'A note has been made!',
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
    //@ts-ignore
    setDateGroups(temp)
  }

  React.useEffect(() => {
    getAll()
      .then((res: any) => { 
        setEntries(res['rows']['_array'])
        // console.log(entries)
        })
      .catch((err) => { console.log(err)})
    // setEntries(genDevEntries());
  }, [])

  React.useEffect(() => {
    get_date_groups()
  }, [entries])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
    // flex: 1,
    backgroundColor: 'lightblue',
    marginHorizontal: 1,
  },
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
