export const groupByDate = (entries: any) => {
  let temp: any = {}

  for(const index in entries)
  {
    //@ts-ignore
    let d = new Date(entries[index].datetime)
    // console.log('-')
    // console.log(d)
    // console.log(startDate)
    // console.log(endDate)
    if(check_dates(d, startDate) === 2 ||
      check_dates(d, startDate) === 1 
      && 
      check_dates(d, endDate) === 0 ||
      check_dates(d, endDate) === 1)
    {
      let month = d.getMonth() + 1
      let m = month.toString()
      let date = m + '/' + d.getDate() + '/' + d.getFullYear()

      if(date in temp)
      {
        // console.log(temp[date])
        temp[date].push(entries[index])
      }
      else
      {
        temp[date] = [entries[index]]
      }
    }
  }
  //@ts-ignore
  setDateGroups(temp)
}
}

export const convertISO = () => {

}

const _convertAMtoPM = () => {

}

const _check_dates = (d1: Date, d2: Date) => {
  /**
   * Compare d1 to d2
   * 
   * Return:
   *  0: less
   *  1: equal
   *  2: greater
   */
  // Check year
  if(d1.getFullYear() < d2.getFullYear()) return 0
  if(d1.getFullYear() > d2.getFullYear()) return 2

  // Check Month
  if(d1.getMonth() < d2.getMonth()) return 0
  if(d1.getMonth() > d2.getMonth()) return 2

  // Check day
  if(d1.getDay() < d2.getDay()) return 0
  if(d1.getDay() > d2.getDay()) return 2

  return 1;
}