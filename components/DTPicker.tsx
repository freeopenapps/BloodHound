import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from './Themed';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DTPicker(
    {title, mode, date, setDate}: 
    {title: string, mode: any, date: Date, setDate: any}) {
    
    const [show, setShow]         = React.useState(false)
    const showPicker = () => { setShow(true); };

    const determineAMPM = (value: number) => {
      if(value >= 12){
        return (value - 12).toString().padStart(2,"0")
      }
      return value.toString().padStart(2,"0")
    }

    const onChange = (event: any, selectedDate: Date) => {
      const currentDate = selectedDate || date;
      setShow(false)//Platform.OS === 'ios');
      //@ts-ignore
      setDate(currentDate);
    };

    return (
    <View style={styles.container}>
        {mode === 'date' ? 
          <Text style={styles.text}>
            {date.getMonth()+1}/
            {date.getDate()}/
            {date.getFullYear()}
          </Text> : 
          <Text style={styles.text}>
            {determineAMPM(date.getHours())}:
            {date.getMinutes().toString().padStart(2,"0")}
            {date.getHours() > 11 ? 'pm':'am'}
          </Text>
        }
        <Button onPress={showPicker} title={title} />

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
