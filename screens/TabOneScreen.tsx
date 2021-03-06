import * as React from 'react';
import { StyleSheet } from 'react-native';

import { create } from '../db';
import InputEntry from '../components/InputEntry';
import DTPicker from '../components/DTPicker';
import { View, Button } from '../components/Themed';
import Entry from '../objects/Entry';

export default function TabOneScreen() {

  const [entry, setEntry] = React.useState<Entry>(Entry.createEmpty())
  const [date, setDate] = React.useState(new Date());

  const createEntry = () => {
    console.log("\nCreate Entry: ")
    console.log(entry.getEntry())
    console.log("\n")

    create(entry).then(() => {
      setEntry(Entry.createEmpty());
      setDate(new Date());
    })
  }

  React.useEffect(()=> {
    // Update entry with new Date
    let e_temp: Entry = Entry.createEmpty();
    e_temp.update(entry.getEntry());
    e_temp.setDateTime(date);
    setEntry(e_temp)
  }, [date])

  return (
    <View style={styles.main_container}>
      <InputEntry entry={entry} setEntry={setEntry}/>
      <View style={styles.datetime_row}>
        <DTPicker 
          title='Set Date'
          mode='date'
          date={date} 
          setDate={setDate}
        />
        <DTPicker
          title='Set Time'
          mode='time'
          date={date} 
          setDate={setDate}
        />
      </View>
      <View style={styles.createbtn_container}>
        <Button title="Create Entry" onPress={createEntry}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  createbtn_container: {
    flex: 0.5,
    width: "50%",
    alignSelf: "center",
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  datetime_row: {
    flex: 0.5,
    flexDirection: 'row',
    padding: "1%"
  },
});
