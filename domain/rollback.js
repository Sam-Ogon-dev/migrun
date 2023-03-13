const mysql = require("mysql2/promise");
const {CONFIG} = require("../config");
const fs = require("fs");
const path = require("path");
const {getFileName} = require("../utils/getFileName");
const {readDownMigrationFile} = require("../utils/readMigrationFile");

async function rollback(amount) {
    const connection = await mysql.createConnection({
        host: CONFIG.host,
        user: CONFIG.user,
        database: CONFIG.db,
        password: CONFIG.password
    });
    const appliedMigrations = await connection.query("SELECT name FROM migrations ORDER BY name DESC").then(([result]) => result.map(item => item.name))

    let counter = 1;
    for (const migration of appliedMigrations) {
        if(counter > amount) { break }
        const down = readDownMigrationFile(migration)
        try {
            await connection.query(down)
            await connection.query("DELETE FROM migrations WHERE name=?", [migration])
            console.log(migration + ": rollback success")
            counter++
        } catch (e) {
            console.log(e)
            break
        }
    }

    connection.end()
}

module.exports = { rollback }
