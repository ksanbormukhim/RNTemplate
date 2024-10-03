import SQLite from 'react-native-sqlite-storage';
import { name as appName } from '../../app.json';
const db = SQLite.openDatabase(
  { name: `${appName}_db.db`, location: 'default' },
  async () => {
    console.log('Database opened successfully');
    await createTables();
  },
  (error) => console.error('Error opening database', error)
);

const createTables = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Create Users table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age INTEGER NOT NULL
        )`,
        [],
        () => {
          console.log('Users table created successfully');
          resolve(); // Resolve the promise after table creation
        },
        (tx, error) => {
          console.error('Error creating Users table', error);
          reject(error); // Reject the promise on error
        }
      );
    });
  });
};

export {
  // createTables,
  db,
};
