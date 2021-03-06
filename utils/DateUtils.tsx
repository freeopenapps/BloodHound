import { LogEntry } from "../types";
import Entry from '../objects/Entry';

export const groupByDate = 
  (entries: LogEntry[], start: Date, end: Date): {} => {
  let temp: any = {}

  for(const index in entries)
  {
    //@ts-ignore
    let d = new Date(entries[index].datetime)
    // console.log('-')
    // console.log(d)
    // console.log(startDate)
    // console.log(endDate)

    // Ensure entry within range
    if(compare_dates(d, start) === 'greater' ||
      compare_dates(d, start) === 'equal' 
      && 
      compare_dates(d, end) === 'less' ||
      compare_dates(d, end) === 'equal')
    {
      let month = d.getMonth() + 1
      let m = month.toString()
      let date = m + '/' + d.getDate() + '/' + d.getFullYear()

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
  //@ts-ignore
  return temp;
}

export const compare_dates = (d1: Date, d2: Date): string => {
  /**
   * Compare d1 to d2
   */

  // Check year
  if(d1.getFullYear() < d2.getFullYear()) return 'less'
  if(d1.getFullYear() > d2.getFullYear()) return 'greater'

  // Check Month
  if(d1.getMonth() < d2.getMonth()) return 'less'
  if(d1.getMonth() > d2.getMonth()) return 'greater'

  // Check day
  if(d1.getDay() < d2.getDay()) return 'less'
  if(d1.getDay() > d2.getDay()) return 'greater'

  return 'equal';
}