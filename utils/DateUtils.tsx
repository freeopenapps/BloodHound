import Entry from '../objects/Entry';

export const groupByDate = 
  (entries: Entry[], start: Date, end: Date): {} => {
  let temp: any = {}

  start.setUTCHours(0)
  start.setUTCMinutes(0)
  start.setUTCSeconds(0)

  end.setUTCHours(23)
  end.setUTCMinutes(59)
  end.setUTCSeconds(59)

  for(const index in entries)
  {
    //@ts-ignore
    let entryDate: Date = entries[index].getDateTime()

    // let s = 'Entry:\t' + entryDate.toISOString()  + '\n'
    // s = s + 'Start:\t' + start.toISOString()   + '\n'
    // s = s + 'End:\t' + end.toISOString()   + '\n'
    // console.log(s)

    // s = 'Entry:\t' + entryDate.toUTCString()  + '\n'
    // s = s + 'Start:\t' + start.toUTCString()   + '\n'
    // s = s + 'End:\t' + end.toUTCString()   + '\n'
    // console.log(s)

    // Ensure entry within range
    if((entryDate > start || entryDate === start) &&
        (entryDate < end || entryDate === end) )
    {
      let date =  (entryDate.getMonth() + 1) + 
                  '/' + 
                  entryDate.getDate() + 
                  '/' + 
                  entryDate.getFullYear()

      // Add to exsitinng date list
      if(date in temp)
      {
        // console.log(temp[date])
        temp[date].push(new Entry(entries[index]))
      }
      // Create a new list for this date
      else
      {
        temp[date] = [new Entry(entries[index])]
      }
    }
  }

  for(const key in temp){
    // console.log(temp[key])
    temp[key]=temp[key].sort((a:Entry, b:Entry)=>{ return a.compare(b); })
    // console.log(temp[key])
  }

  return temp;
}

export const convert_time = (datetime: string): string => {
  /**
   * 2021-03-06 13:05:18.000 ---> 1:05pm
   */
  let d = new Date(datetime.replace(' ', 'T') + 'Z')
  // Get info in system local time
  let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  let minutes = d.getMinutes().toString().padStart(2,"0");
  let suffix = d.getHours() > 11 ? "pm" : "am";

  return hours + ':' + minutes + suffix;
}