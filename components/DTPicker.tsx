import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from './Themed';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DTPicker(
    {title, mode, date, setDate}: 
    {title: string, mode: any, date: Date, setDate: any}) {
    
    const [show, setShow]         = React.useState(false)
    const showPicker = () => { setShow(true); };

    const onChange = (event: any, selectedDate: Date) => {
      setShow(false)//Platform.OS === 'ios');
      if(selectedDate){
        setDate(selectedDate);
      }
    };

    return (
    <View style={styles.container}>
        {mode === 'date' ? 
          <Text style={styles.text}>
            {date.toDateString()}
          </Text> : 
          <Text style={styles.text}>
            {date.toTimeString()}
          </Text>
        }
        <Button onPress={showPicker} title={title} />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
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
        fontSize: 14,
        fontWeight: 'normal',
    }
  });
