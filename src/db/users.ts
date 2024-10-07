import { db } from './config';

// Insert a user
export const insertUser = (name: string, age: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Users (name, age) VALUES (?, ?)',
      [name, age],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User added successfully');
        }
      },
      (error) => {
        console.error('Error inserting data', error);
      }
    );
  });
};

// Retrieve users
export const getUsers = (
  callback: (users: { id: number; name: string; age: number }[]) => void
) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Users',
      [],
      (tx, results) => {
        const len = results.rows.length;
        const users = [];
        for (let i = 0; i < len; i++) {
          users.push(results.rows.item(i));
        }
        callback(users); // Pass retrieved users to the callback
      },
      (error) => {
        console.error('Error retrieving data', error);
      }
    );
  });
};

// Update a user
export const updateUser = (id: number, name: string, age: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE Users SET name = ?, age = ? WHERE id = ?',
      [name, age, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User updated successfully');
        }
      },
      (error) => {
        console.error('Error updating data', error);
      }
    );
  });
};

// Delete a user
export const deleteUser = (id: number) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM Users WHERE id = ?',
      [id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log('User deleted successfully');
        }
      },
      (error) => {
        console.error('Error deleting data', error);
      }
    );
  });
};
