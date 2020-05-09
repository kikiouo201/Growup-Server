const MYSQL = require('mysql');
const CON = require('./conn.js');

const conn = MYSQL.createConnection(CON.mysqldata);

function createConnection() {
  conn.connect((err) => {
    if (err) throw err;
    // console.log('connect success!');
  });
}
// 修改
function alterData(table, sql, condition, data, getAns) {
  let string = {};
  const mcondition = condition;
  const mdata = data;
  conn.query(`UPDATE ${table} SET ${sql} WHERE ${mcondition}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
    // console.log("string="+string);
    mdata.content = array;
    getAns(data);
  });
}

// 查詢
function inquireData(table, condition, data, getAns) {
  let string = {};
  let mcondition = condition;
  const mdata = data;
  if (mcondition !== '') mcondition = `WHERE ${mcondition}`;
  conn.query(`SELECT * FROM ${table} ${mcondition}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
    // console.log("string="+string);
    mdata.content = array;
    getAns(data);
  });
}
// 增加
function addData(table, sql, data, getAns) {
  let string = {};
  const mdata = data;
  conn.query(`INSERT INTO ${table} SET ${sql}`, (err, rows) => {
    if (err) {
      console.log(err);
    }

    string = JSON.stringify(rows);
    const array = JSON.parse(string);
    console.log(`string=${string}`);
    mdata.content = array;
    getAns(data);
  });
}


function deleteData(table, sql, data, getAns) {
  let string = {};
  const mdata = data;
  conn.query(`DELETE FROM ${table} WHERE ${sql}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log('Delete 200 ok');
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
    console.log(`string=${string}`);
    mdata.content = array;
    getAns(data);
  });
}

function closeConnect() {
  // 關閉連線時呼叫
  conn.end((err) => {
    if (err) throw err;
    console.log('connect end');
  });
}


module.exports = {
  createConnection,
  inquireData,
  addData,
  closeConnect,
  deleteData,
  alterData,
};
