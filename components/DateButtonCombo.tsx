import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from './Themed';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateButtonCombo(
    {title, mode, date,  setDate}: 
    {title: string, mode: any, date: any, setDate: any}) {
    
    const [show, setShow] = React.useState(false)
    const showPicker = () => { setShow(true); };

    const onChange = (event: any, selectedDate: boolean) => {
        const currentDate = selectedDate || date;
        setShow(false)//Platform.OS === 'ios');
        setDate(currentDate);
      };

    return (
    <View style={styles.dates_container}>
        <Text style={styles.dates_text}>{date.getMonth()+1}/{date.getDate()}/{date.getFullYear()}</Text>
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
    dates_container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dates_text : {
        fontSize: 18,
        fontWeight: 'normal',
    }
  });
