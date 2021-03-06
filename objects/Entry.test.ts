import Entry from './Entry';

describe('Entry', () => {
  let e: Entry;

  beforeEach(() => {
    e = Entry.createEmpty();
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetAllMocks()
  })

  it(`converts Date ISO to SQLite ISO8601`, () => {
    const isoString = '2021-03-03T04:05:18.000Z'
    const expected = '2021-03-03 04:05:18.000'
  
    expect(e.convertDate(isoString)).toBe(expected);
  });
})

