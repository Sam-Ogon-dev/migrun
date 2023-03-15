const mysql = require("mysql2/promise");
const {CONFIG} = require("../config");
const {readDownMigrationFile} = require("../utils/readMigrationFile");

async function rollback(manualAmount) {
    let amount = 0;
    const connection = await mysql.createConnection({
        host: CONFIG.host,
        user: CONFIG.user,
        database: CONFIG.db,
        password: CONFIG.password
    });

    let appliedMigrations;
    if (manualAmount === 0) {
        appliedMigrations = await connection.query("SELECT name FROM migrations WHERE created_at >= DATE_SUB((SELECT created_at FROM migrations ORDER BY name DESC LIMIT 1), INTERVAL 1 MINUTE) ORDER BY name DESC").then(([result]) => result.map(item => item.name))
        amount = appliedMigrations.length
    } else {
        appliedMigrations = await connection.query("SELECT name FROM migrations ORDER BY name DESC").then(([result]) => result.map(item => item.name))
        amount = manualAmount
    }

    let counter = 1;
    for (const migration of appliedMigrations) {
        if (counter > amount) {
            break
        }
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

module.exports = {rollback}
