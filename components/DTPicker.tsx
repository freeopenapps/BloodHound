import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from './Themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import Entry from '../objects/Entry';

export default function DTPicker(
    {title, mode, entry,  setEntry}: 
    {title: string, mode: any, entry: Entry, setEntry: any}) {
    
    const [show, setShow]         = React.useState(false)
    const [dateTime, setDateTime] = React.useState(new Date())
    const [ampm, setAmpm]         = React.useState('')

    const showPicker = () => { setShow(true); };

    const determineAMPM = (value: number) => {
      if(value >= 12){
        setAmpm('pm')
        return value -12
      }
      setAmpm('am')
      return value
    }

    const onChange = (event: any, selectedDate: Date) => {
      const currentDate = selectedDate || dateTime;
      setShow(false)//Platform.OS === 'ios');
      //@ts-ignore
      setDateTime(currentDate);
      
      if(selectedDate){
        // Create temp with props entry values
        let e_temp: Entry = new Entry(entry.getEntry());

        // Update specific attribute
        e_temp.setDateTime(selectedDate);

        // replace old Entry with e_temp
        setEntry(e_temp)
      }
    };

    return (
    <View style={styles.container}>
        {mode === 'date' ? 
          <Text style={styles.text}>
            {dateTime.getMonth()+1}/
            {dateTime.getDate()}/
            {dateTime.getFullYear()}
          </Text> : 
          <Text style={styles.text}>
            {determineAMPM(dateTime.getHours())}:
            {dateTime.getMinutes()}:
            {dateTime.getSeconds()}{ampm}
          </Text>
        }
        <Button onPress={showPicker} title={title} />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTime}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={(event: any, selection: any) => onChange(event, selection)}
          />
        )}
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text : {
        fontSize: 18,
        fontWeight: 'normal',
    }
  });
