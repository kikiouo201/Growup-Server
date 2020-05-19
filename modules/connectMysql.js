const Mysql = require('mysql');
// eslint-disable-next-line node/no-unpublished-require
const config = require('../.config.js');

const database = Mysql.createConnection(config.mysql);

function createConnection() {
  database.connect((err) => {
    if (err) throw err;
    // console.log('connect success!');
  });
}
// 修改
function alterData(table, sql, condition, data, getAns) {
  let string = {};
  let mcondition = condition;
  const mdata = data;
  if (mcondition !== '') mcondition = `WHERE ${mcondition}`;
  database.query(`UPDATE ${table} SET ? ${mcondition}`, [sql], (err, rows) => {
    if (err) {
      console.log(err);
    }
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
    console.log(`string=${string}`);
    mdata.content = array;
    getAns(mdata);
  });
}

// 查詢
function inquireData(table, sql, data, getAns) {
  let string = {};
  const mdata = data;

  database.query(`SELECT * FROM ${table} WHERE ?`, sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
    // console.log("string="+string);
    mdata.content = array;
    getAns(mdata);
  });
}


// 查詢
function inquireTwoData(sql, data, getAns) {
  let str = {};
  const mdata = data;
  database.query('SELECT * FROM Book_Content INNER JOIN QA ON Book_Content.qa_id=QA.id  WHERE ?', sql, (err, rows) => {
    if (err) {
      console.log(err);
    }
    str = JSON.stringify(rows);
    console.log(`string=${str}`);
    mdata.content = JSON.parse(str);
    getAns(mdata);
  });
}

// 增加
function addData(table, sql, data, getAns) {
  let string = {};
  const mdata = data;
  console.log(sql);
  database.query(`INSERT INTO ${table} SET ?`, sql, (err, rows) => {
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
  database.query(`DELETE FROM ${table} WHERE ?`, sql, (err, rows) => {
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
  database.end((err) => {
    if (err) throw err;
    console.log('connect end');
  });
}


module.exports = {
  createConnection,
  inquireData,
  inquireTwoData,
  addData,
  closeConnect,
  deleteData,
  alterData,
};
