const fs = require("fs");
const path = require("path");


function createMigration(name) {
    if (!fs.existsSync(path.join(__dirname, "../", "../", "../", "migrations"))) {
        fs.mkdirSync(path.join(__dirname, "../", "../", "../", "migrations"))
    }

    const dirName = Date.now().toString() + "_" + name
    fs.mkdirSync(path.join(__dirname, "../", "../", "../", "migrations", dirName))
    fs.appendFileSync(path.join(__dirname, "../", "../", "../", "migrations", dirName, name + ".up.sql"), "# up migration here...")
    fs.appendFileSync(path.join(__dirname, "../", "../", "../", "migrations", dirName, name + ".down.sql"), "# down migration here...")
}

module.exports = {createMigration}


