import SQLite from 'react-native-sqlite-storage';
import { name as appName } from '../../app.json';

// Initialize database with a promise
const initializeDatabase = (): Promise<SQLite.SQLiteDatabase> => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      { name: `${appName}_db.db`, location: 'default' },
      () => {
        console.log('Database opened successfully');
        resolve(db); // Resolve the promise with the database instance
      },
      (error) => {
        console.error('Error opening database', error);
        reject(error); // Reject the promise if there’s an error
      }
    );
  });
};

// Export the database instance
let db: SQLite.SQLiteDatabase | null = null;

const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    try {
      db = await initializeDatabase();
    } catch (error) {
      throw new Error(
        'Failed to initialize the database: ' + (error as any).message
      );
    }
  }
  return db;
};

export { getDatabase };
