// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

export default function EntryEntry({entry}: {entry: any}) {
  const [values, setValues] = React.useState<any>({})
  
  React.useEffect(() => {
    setValues(entry)
  }, [])

  const convert_time = (datetime: string): string => {
    /**
     * 2021-03-03T04:05:18.000Z ---> 4:05am
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
    let suffix = d.getHours() > 12 ? "pm" : "am";

    return date + ' ' + hours + ':' + minutes + suffix;
  }

  const convert_pressure = (sys: number, dia: number, bpm: number): string => {
    return sys + '/' + dia + '/' + bpm;
  }

  return (
    <View style={styles.column_container}>
      <View style={styles.row_container}>
        <DateView value={convert_time(values['datetime'])} />
        <Value title='Ketones' value={values['ketones']} unit="mmol/L" />
        <Value title='Glucose' value={values['glucose']} unit="mg/dL" />
        <Value title='Weight' value={values['weight']} unit="lb" />
        <Value title='Pressure' 
          value={convert_pressure(values['systolic'],values['diastolic'],values['bpm'])} 
          unit="sys/dia/bpm" />
      </View>
      <View style={styles.row_container}>
        <Text
          style={styles.note_text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {values['note']}
        </Text>
      </View>
    </View>
  );
}

function Value({title, value,unit}: {title: string, value: string, unit: string}) {
  return(
    <View style={styles.value_container}>
      <Text
        style={styles.value_top}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {title}
      </Text>
      <Text
        style={styles.value_mid}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {value === "" ? '-' : value}
      </Text>
      <Text
        style={styles.value_bottom}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {unit}
      </Text>
  </View>
  );
}

function DateView({value}: {value: string}) {
  return(
    <View style={styles.value_container}>
      <Text
        style={styles.date_text}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {value.split(' ')[1]}
      </Text>
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
  },
  value_container: {
    // flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    backgroundColor: bgColor,
    borderColor: 'black',
    borderWidth: 0.5
  },
  value_top: {
    // flex: 1,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center'
  },
  value_mid: {
    // flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  value_bottom: {
    // flex: 1,
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center'
  },
  date_text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'center',
    alignContent: 'center',
    alignItems:'center',
    padding: '2%',
    marginTop: '25%'
  },
  note_text: {
    // flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  }
});
