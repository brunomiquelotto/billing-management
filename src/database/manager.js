import sqlite from 'better-sqlite3-with-prebuilds';
console.log(sqlite);
const db = new sqlite('../../public/database.db', (err) => {
    if (err) {
      console.log('Could not connect to database', err);
    } else {
      console.log('Connected to database');
    }
});

export default db;
