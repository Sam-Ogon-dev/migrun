const fs = require("fs");
const path = require("path");

function init() {
    fs.appendFileSync(path.join(__dirname, "../", "../", "../", "migrun.config.json"),
        "{\n" +
        "  \"host\": \"\",\n" +
        "  \"user\": \"\",\n" +
        "  \"password\": \"\",\n" +
        "  \"db\": \"\"\n" +
        "}"
    )
}

module.exports = {init}
