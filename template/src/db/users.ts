import { getDatabase } from './config';

export type UserType = { id: number; name: string; age: number };

// Insert a user
export const insertUser = async (name: string, age: number): Promise<void> => {
  try {
    const db = await getDatabase();
    await new Promise<void>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
          )`,
          [],
          () => {
            tx.executeSql(
              'INSERT INTO Users (name, age) VALUES (?, ?)',
              [name, age],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  resolve();
                } else {
                  reject(new Error('Failed to insert user.'));
                }
              },
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    throw new Error(`Error in insertUser: ${(error as any).message}`);
  }
};

export const getUsers = async (): Promise<UserType[]> => {
  try {
    const db = await getDatabase();

    return new Promise<UserType[]>((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Users',
          [],
          (tx, results) => {
            const rows = results.rows;
            const users: UserType[] = [];

            for (let i = 0; i < rows.length; i++) {
              users.push(rows.item(i));
            }

            resolve(users);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  } catch (error) {
    throw new Error(`Error in selectUsers: ${(error as any).message}`);
  }
};

// // Update a user
// export const updateUser = (id: number, name: string, age: number) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'UPDATE Users SET name = ?, age = ? WHERE id = ?',
//       [name, age, id],
//       (tx, results) => {
//         if (results.rowsAffected > 0) {
//           console.log('User updated successfully');
//         }
//       },
//       (error) => {
//         console.error('Error updating data', error);
//       }
//     );
//   });
// };

// // Delete a user
// export const deleteUser = (id: number) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       'DELETE FROM Users WHERE id = ?',
//       [id],
//       (tx, results) => {
//         if (results.rowsAffected > 0) {
//           console.log('User deleted successfully');
//         }
//       },
//       (error) => {
//         console.error('Error deleting data', error);
//       }
//     );
//   });
// };
