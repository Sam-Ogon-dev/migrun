#!/usr/bin/env node
const {createMigration} = require("./domain/createMigration");
const {migrate} = require("./domain/migrate");
const {rollback} = require("./domain/rollback");
const {init} = require("./domain/init");

const command = process.argv[2];

switch (command) {
    case "create":
        const name = process.argv[3];
        createMigration(name)
        break
    case "migrate":
        migrate().then()
        break
    case "rollback":
        const amount = process.argv[3] || 0;
        rollback(+amount).then()
        break
    case "init":
        init()
        break
}

