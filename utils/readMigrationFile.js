const {getFileName} = require("./getFileName");
const fs = require("fs");
const path = require("path");

function readUpMigrationFile(migration) {
    let fileName = getFileName(migration)
    return fs.readFileSync(path.join(__dirname, "../", "../", "../", "migrations", migration, fileName + ".up.sql"), "utf-8")
}

function readDownMigrationFile(migration) {
    let fileName = getFileName(migration)
    return fs.readFileSync(path.join(__dirname, "../", "../", "../", "migrations", migration, fileName + ".down.sql"), "utf-8")
}

module.exports = {readUpMigrationFile, readDownMigrationFile}
