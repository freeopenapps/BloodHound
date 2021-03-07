import { LogEntry } from '../types';
import {groupByDate, convert_time} from './DateUtils';
import Entry from '../objects/Entry';

let entryLogs: LogEntry[];
let entryObjs: Entry[];

beforeEach(() => {
  let entryLog: LogEntry =
    {
      'ketones': '1',
      'glucose': '120',
      'weight': '123',
      'systolic': '130',
      'diastolic': '60',
      'bpm': '2',
      'note': 'Below range',
      'datetime': '2019-03-03T04:05:18.000Z'
    }
  
    entryLogs = []
    entryLog.datetime = '2019-03-03 04:05:18.000';    
    entryLogs.push(JSON.parse(JSON.stringify(entryLog)))
    entryLog.datetime = '2023-03-04 04:05:18.000';    
    entryLogs.push(JSON.parse(JSON.stringify(entryLog)))
    entryLog.datetime = '2020-03-02 04:05:18.000';    
    entryLogs.push(JSON.parse(JSON.stringify(entryLog)))
    entryLog.datetime = '2021-03-06 03:05:18.000';    
    entryLogs.push(JSON.parse(JSON.stringify(entryLog)))
    entryLog.datetime = '2021-03-06 00:00:18.000';    
    entryLogs.push(JSON.parse(JSON.stringify(entryLog)))
    entryLog.datetime = '2021-03-06 23:58:59.000';    
    entryLogs.push(JSON.parse(JSON.stringify(entryLog)))
    
    entryObjs = [];
    entryLogs.map((e: LogEntry) => {
      entryObjs.push(new Entry(e))
    })
  });

afterEach(() => {
  jest.restoreAllMocks()
  jest.resetAllMocks()
})

test('convert_time', () => {
    let am = '2021-03-06 04:05:18.000'
    let pm = '2021-03-06 15:05:18.000'
    let expect_am = '4:05am'
    let expect_pm = '3:05pm'

    expect(convert_time(am)).toBe(expect_am)
    expect(convert_time(pm)).toBe(expect_pm)
  })

describe('groupByDate', () => {
  test('handle midnight times correctly', () => {
    let start = new Date('2021-03-06T23:59:18.000Z')
    let end = new Date('2021-03-06T00:00:18.000Z')

    let results = groupByDate(entryObjs, start, end)
    // console.log(results)

    expect(results).toHaveProperty('3/6/2021')
    expect(Object.keys(results)).toHaveLength(1);
    expect(results['3/6/2021']).toHaveLength(3)
  })

  test('handle range correctly', () => {
    let start = new Date('2019-03-02T23:59:18.000Z')
    let end = new Date('2021-04-06T00:00:18.000Z')

    let results = groupByDate(entryObjs, start, end)
    // console.log(results)

    expect(results).toHaveProperty('3/3/2019')
    expect(results).toHaveProperty('3/2/2020')
    expect(results).toHaveProperty('3/6/2021')
    expect(Object.keys(results)).toHaveLength(3);
    expect(results['3/3/2019']).toHaveLength(1)
    expect(results['3/2/2020']).toHaveLength(1)
    expect(results['3/6/2021']).toHaveLength(3)
  })
})

