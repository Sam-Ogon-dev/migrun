const fs = require("fs");
const Path = require("path");
let CONFIG = null

try {
    CONFIG = JSON.parse(fs.readFileSync(Path.join(__dirname, "../", "../", "migrun.config.json"), "utf-8"))
} catch (e) {}

module.exports = { CONFIG }
