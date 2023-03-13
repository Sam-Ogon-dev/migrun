const mysql = require('mysql2/promise');
const {CONFIG} = require("../config");
const fs = require("fs");
const path = require("path");
const {getMigrationsForExec} = require("../utils/getMigrationsForExec");
const {readUpMigrationFile, readDownMigrationFile} = require("../utils/readMigrationFile");

async function migrate() {
    const connection = await mysql.createConnection({
        host: CONFIG.host,
        user: CONFIG.user,
        database: CONFIG.db,
        password: CONFIG.password
    });

    const isInit = await connection.query("show tables like 'migrations'").then(([result]) => !!result.length)

    if (!isInit) {
        await connection.query("CREATE TABLE migrations(id int NOT NULL PRIMARY KEY AUTO_INCREMENT, name text, created_at datetime);")
    }

    const appliedMigrations = await connection.query("SELECT name FROM migrations ORDER BY name ASC").then(([result]) => result.map(item => item.name))
    const migrations = fs.readdirSync(path.join(__dirname, "../", "../", "../", "migrations"))
    const migrationsForExec = getMigrationsForExec(migrations, appliedMigrations)

    for (const migration of migrationsForExec) {
        const up = readUpMigrationFile(migration)
        const down = readDownMigrationFile(migration)
        try {
            await connection.query(up)
            await connection.query("INSERT INTO migrations(name, created_at) VALUES (?, NOW())", [migration])
            console.log(migration + ": exec success")
        } catch (e) {
            console.log(e)
            await connection.query(down)
            break
        }
    }

    connection.end()
}

module.exports = {migrate}
