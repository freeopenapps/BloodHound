import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { create, LogEntry } from '../db';
import InputEntry from '../components/InputEntry';
import { TextInput, View, Text, Button } from '../components/Themed';
import Entry from '../objects/Entry';

export default function TabOneScreen() {

  const [entry, setEntry] = React.useState<Entry>(Entry.createEmpty())

  const createEntry = () => {
    // console.log(entry)
    create(entry).then(() => {
      setEntry(Entry.createEmpty());
    })
  }

  return (
    <View style={styles.main_container}>
      <InputEntry entry={entry} setEntry={setEntry}/>

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
  inputs_container: {
    flex: 2.5,
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  note_container: {
    flex: 1.5,
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  datetime_container: {
    flex: 1,
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  datetime_row: {
    flex: 1,
    flexDirection: 'row',
    padding: "1%"
  },
  datetime_info_container: {
    flex: 0.8,
    flexDirection: 'column',
    padding: "1%",
    paddingHorizontal: "9%"
  },
  createbtn_container: {
    flex: 0.5,
    width: "50%",
    alignSelf: "center",
    paddingTop: "2%",
    paddingBottom: "4%"
  },
  title: {
    fontSize: 20,
    paddingLeft: "10%",
    fontWeight: 'bold',
  },
  info_text: {
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: "10%",
    fontWeight: 'normal',
  },
  noteText: {
    height: "80%", 
    width: "80%",
    alignSelf: "center",
    borderColor: 'gray', 
    borderWidth: 1
  }
});
