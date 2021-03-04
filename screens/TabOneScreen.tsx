import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { create, LogEntry } from '../db';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputRow from '../components/InputRow';
import { TextInput, View, Text, Button } from '../components/Themed';

export default function TabOneScreen() {
  let separatorDarkColor = "rgba(255,255,255,1)"
  let separatorLightColor = "rgba(0,0,0,1)"

  const [ketones, setKetones] = React.useState<string>("")
  const [glucose, setGlucose] = React.useState<string>("")
  const [weight, setWeight] = React.useState<string>("")

  const [systolic, setSystolic] = React.useState<string>("")
  const [diastolic, setDiastolic] = React.useState<string>("")
  const [bpm, setBpm] = React.useState<string>("")

  const [note, setNote] = React.useState<string>("")

  // Date - Time
  const [date, setDate] = React.useState<any>(new Date(Date()));
  const [mode, setMode] = React.useState<any>('date');
  const [show, setShow] = React.useState<any>(false);

  const onChange = (event: any, selectedDate: boolean) => {
    const currentDate = selectedDate || date;
    setShow(false)//Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const convertToAMPM = (value: number) => {
    return value > 12 ? value - 12 : value
  }

  const createEntry = () => {
    let entry: LogEntry = {
      ketones: ketones,
      glucose: glucose,
      weight: weight,
      systolic: systolic,
      diastolic: diastolic,
      bpm: bpm,
      note: note,
      datetime: date.toISOString()
    }

    // console.log(entry)
    create(entry).then(() => {
      setKetones("")
      setGlucose("")
      setWeight("")
      setSystolic("")
      setDiastolic("")
      setBpm("")
      setNote("")
      setDate(new Date(Date()))
    })
  }
  return (
    <View style={styles.main_container}>
      <View style={styles.inputs_container}>
        <Text style={styles.title}>Entry</Text>
        <InputRow title='Ketones' units='mmol/L' value={ketones} setFn={setKetones}/>
        <InputRow title='Glucose' units='mg/dL' value={glucose} setFn={setGlucose}/>
        <InputRow title='Weight' units='lb' value={weight} setFn={setWeight}/>
        <InputRow title='Systolic' units='mmHg' value={systolic} setFn={setSystolic}/>
        <InputRow title='Diastolic' units='mmHg' value={diastolic} setFn={setDiastolic}/>
        <InputRow title='Bpm' units='bpm' value={bpm} setFn={setBpm}/>
      </View>
      
      {/* <View style={styles.separator} lightColor={separatorLightColor} darkColor={separatorDarkColor} /> */}
      
      <View style={styles.note_container}>
        <Text style={styles.title}>Note</Text>
        <TextInput 
          style={styles.noteText}
          multiline
          numberOfLines={4}
          value={note}
          onChangeText= {text => setNote(text)}/>
      </View>
      
      {/* <View style={styles.separator} lightColor={separatorLightColor} darkColor={separatorDarkColor} /> */}
      
      <View style={styles.datetime_container}>
        <Text style={styles.title}>Date & Time</Text>
        <View style={styles.datetime_row} >
          <View style={styles.datetime_info_container}>
            <Text style={styles.info_text}>{date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</Text>
            <Button onPress={showDatepicker} title="Set Date" />
          </View>
          <View style={styles.datetime_info_container}>
            <Text style={styles.info_text}>
            {convertToAMPM(date.getHours())}:{date.getMinutes().toString().padStart(2,0)} {date.getHours() > 12 ? "pm" : "am"}
            </Text>
            <Button onPress={showTimepicker} title="Set Time" />
          </View>
        </View>
      
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={(event: any, selection: any) => onChange(event, selection)}
          />
        )}
      </View>

      {/* <View style={styles.separator} lightColor={separatorLightColor} darkColor={separatorDarkColor} /> */}
      
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
  },
  separator: {
    marginVertical: "1%",
    height: 1,
    width: '85%',
    alignSelf: "center"
  },
});
