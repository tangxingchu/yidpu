//基础配置表
const configTable = "CREATE TABLE IF NOT EXISTS config (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "name VARCHAR(100) NOT NULL," +
    "value VARCHAR(100) NOT NULL)";

module.exports = [
    configTable,
]
