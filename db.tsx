import * as SQLite from 'expo-sqlite';

export type LogEntry = {
    ketones: string;
    glucose: string;
    weight: string;
    systolic: string;
    diastolic: string;
    bpm: string;
    note: string;
    datetime: string;
}

const db = SQLite.openDatabase('entries.db')

export const init_db = () => {
    const promise = new Promise(
        (resolve: any, reject: any) => {
            db.transaction(tx => {
                let cols = 'ketones TEXT, '
                cols = cols + 'glucose TEXT, '
                cols = cols + 'weight TEXT, '
                cols = cols + 'systolic TEXT, '
                cols = cols + 'diastolic TEXT, '
                cols = cols + 'bpm TEXT, '
                cols = cols + 'note TEXT, '
                cols = cols + 'datetime TEXT'
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY NOT NULL, ' + cols + ')',
                    [],
                    () => resolve(),
                    (_, err) => reject(err) 
                )
                // tx.executeSql(
                //     'DROP TABLE entries',
                //     [],
                //     () => resolve(),
                //     (_, err) => reject(err) 
                // )
            })
        })
    return promise;
}

export const create = (entry: LogEntry) => {
    const promise = new Promise(
        (resolve: any, reject: any) => {
            db.transaction(tx => {
                let cols = 'ketones, ';
                cols = cols + 'glucose, ';
                cols = cols + 'weight, ';
                cols = cols + 'systolic, ';
                cols = cols + 'diastolic, ';
                cols = cols + 'bpm, ';
                cols = cols + 'note, ';
                cols = cols + 'datetime';

                tx.executeSql(
                    'INSERT INTO entries (' + cols + ') VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [entry.ketones,
                     entry.glucose,
                     entry.weight,
                     entry.systolic,
                     entry.diastolic,
                     entry.bpm,
                     entry.note,
                     entry.datetime],
                    (_, result) => resolve(result),
                    (_, err) => reject(err) 
                )
            })
        })
    return promise;
}

export const getAll = () => {
    const promise = new Promise(
        (resolve: any, reject: any) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM entries',
                    [],
                    (_, result) => resolve(result),
                    (_, err) => reject(err) 
                )
            })
        })
    return promise;
}