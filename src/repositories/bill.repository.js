import database from '../database/manager.js';

const read = ({ month, year }, callback) => {
    console.log(database);
    // const sql = "SELECT * FROM bill WHERE strftime('%m', DueDate) = '?' AND strftime('%Y', DueDate) = '?'";
    // const stmt = database.prepare(sql, [ month, year ]);
    // return stmt.all(callback);
}

export { read };