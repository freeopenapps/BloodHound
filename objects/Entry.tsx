import {DateTime} from 'luxon';

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
    /**
     * Dates are ISO UTC strings with T and Z removed
     * for SQLite date function compatibility.
     */
    this.datetime = this.convertDate(date.toISOString());
  }

  getDateTime = (): Date => {
    return new Date(this.datetime.replace(' ','T') + 'Z')
  }

  convertDate = (date: string): string => {
    // Remove T in middle
    let [d, t] = date.split('T')
    // Remove Z at end
    t = t.slice(0,-1)
    return d + ' ' + t;
  }

  getDate = (): string => {
    // 2021-03-06
    return this.datetime.split(' ')[0]
  }

  getTime = (): string => {
    // 04:05:18.000
    return this.datetime.split(' ')[1]
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