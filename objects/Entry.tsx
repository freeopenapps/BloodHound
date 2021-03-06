import {LogEntry} from '../types'

export default class Entry {
  ketones: string;
  glucose: string;
  weight: string;
  systolic: string;
  diastolic: string;
  bpm: string;
  note: string;
  datetime: string;

  // Takes a LogEntry
  constructor(entry: LogEntry){
    this.ketones    = entry.ketones;
    this.glucose    = entry.glucose;
    this.weight     = entry.weight;
    this.systolic   = entry.systolic;
    this.diastolic  = entry.diastolic;
    this.bpm        = entry.bpm;
    this.note       = entry.note;
    this.datetime   = entry.datetime;
  }

  static createEmpty() {
    // Constuctor for empty Entry
    return new Entry(
      {
        ketones: '',
        glucose: '',
        weight: '',
        systolic: '',
        diastolic: '',
        bpm: '',
        note: '',
        datetime: ''
      }
    )
  }

  setDateTime = (date: Date) => {
    this.datetime = this.convertDate(date.toISOString());
  }

  convertDate = (date: string): string => {
    let [d, t] = date.split('T')
    t = t.slice(0,-1)
    return d + ' ' + t;
  }

  getEntry = (): LogEntry => {
    return {
      ketones: this.ketones,
      glucose: this.glucose,
      weight: this.weight,
      systolic: this.systolic,
      diastolic: this.diastolic,
      bpm: this.bpm,
      note: this.note,
      datetime: this.datetime
    }
  }

  update = (entry: LogEntry)=> {
    this.ketones    = entry.ketones;
    this.glucose    = entry.glucose;
    this.weight     = entry.weight;
    this.systolic   = entry.systolic;
    this.diastolic  = entry.diastolic;
    this.bpm        = entry.bpm;
    this.note       = entry.note;
    this.datetime   = entry.datetime;
  }

  compare = (other: Entry) => {
    /** 
     * this later than other? return -1 (Leave alone)
     * this earlier than other? return 1 (Swap them)
     * else return 0 (Not 100% sure what this does)
     */

    let thisDate = new Date(this.datetime.replace(' ', 'T'));
    let otherDate = new Date(other.datetime.replace(' ', 'T'));

    // console.log('\nComparing...')
    // console.log(thisDate)
    // console.log(otherDate)
    // console.log(thisDate >= otherDate)

    return thisDate > otherDate ? -1 : thisDate < otherDate ? 1 : 0;
  }
}