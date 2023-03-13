function getMigrationsForExec(migrations, appliedMigrations) {
    return migrations.filter(migration => {
        return !appliedMigrations.includes(migration) && migration.match(/\d+_/g)
    }).sort((migration1, migration2) => {
        return migration1.split("_")[0] > migration2.split("_")[0] ? 1 : -1
    })
}

module.exports = { getMigrationsForExec }
