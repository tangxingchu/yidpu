
//队列元素表
const queueElementTable = "CREATE TABLE IF NOT EXISTS queue_element (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT," +
    "queue_id INTEGER NOT NULL," +
    "queue_sequence VARCHAR(10) NOT NULL," +
    "queue_number INTEGER NOT NULL," +
    "person_number INTEGER NOT NULL," +
    "sort_no INTEGER NULL," +
    "put_time DATETIME NOT NULL," +
    "poll_time DATETIME NULL," +
    "create_time DATETIME NULL)";

module.exports = [
    queueElementTable,
]
