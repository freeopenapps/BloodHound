import * as React from 'react';
import { StyleSheet } from 'react-native';

import { getAll } from '../db';
import Entry from '../components/Entry';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [entries, setEntries] = React.useState<[]>([])

  React.useEffect(() => {
    getAll()
      .then((res: any) => { 
        setEntries(res['rows']['_array'])
        // console.log(entries)
        })
      .catch((err) => { console.log(err)})
  }, [])

  return (
    <View style={styles.container}>
      {entries.map((e: any, key: number) => {
          return <Entry key={key} entry={e} />
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
