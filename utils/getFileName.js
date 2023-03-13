function getFileName(migration) {
    let fileName = migration.split("_")
    fileName.splice(0, 1)
    fileName = fileName.join("_")
    return fileName
}

module.exports = {getFileName}
