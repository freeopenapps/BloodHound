import { LogEntry } from '../types';
import {groupByDate, compare_dates} from './DateUtils';

describe('DateUtils', () => {

  let entries: LogEntry[];
  let start: Date;
  let end: Date;

  beforeEach(() => {
    start = new Date('2020-03-03T04:05:18.000Z');
    end = new Date('2022-05-01T04:05:18.000Z');

    entries = [{
      'ketones': '1',
      'glucose': '120',
      'weight': '123',
      'systolic': '130',
      'diastolic': '60',
      'bpm': '2',
      'note': 'Below range',
      'datetime': '2019-03-03 04:05:18.000Z'
    },
    {
      'ketones': '1',
      'glucose': '120',
      'weight': '123',
      'systolic': '130',
      'diastolic': '60',
      'bpm': '2',
      'note': 'Past range',
      'datetime': '2023-03-04 04:05:18.000Z'
    },
    {
      'ketones': '1',
      'glucose': '120',
      'weight': '123',
      'systolic': '130',
      'diastolic': '60',
      'bpm': '2',
      'note': 'Below range',
      'datetime': '2020-03-02 04:05:18.000Z'
    },
    {
      'ketones': '1',
      'glucose': '120',
      'weight': '123',
      'systolic': '130',
      'diastolic': '60',
      'bpm': '2',
      'note': 'Within range',
      'datetime': '2021-03-06 04:05:18.000Z'
    }
  ]}
  );

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  it(`compare_dates`, () => {
    expect(compare_dates(new Date(entries[0].datetime),
                          start)).toBe('less');
    expect(compare_dates(new Date(entries[0].datetime),
                          end)).toBe('less');
    
    expect(compare_dates(new Date(entries[1].datetime),
                          start)).toBe('greater');
    expect(compare_dates(new Date(entries[1].datetime),
                          end)).toBe('greater'); 
                          
    expect(compare_dates(new Date(entries[2].datetime),
                          start)).toBe('less');
    expect(compare_dates(new Date(entries[2].datetime),
                          end)).toBe('less');

    expect(compare_dates(new Date(entries[3].datetime),
                          start)).toBe('greater');
    expect(compare_dates(new Date(entries[3].datetime),
                          end)).toBe('less');
  });
})

