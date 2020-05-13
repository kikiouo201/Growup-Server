const Mysql = require('mysql');
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
  database.query('UPDATE '+table+' SET ? '+mcondition,[sql], (err, rows) => {
    if (err) {
      console.log(err);
    }
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
     console.log("string="+string);
    mdata.content = array;
    getAns(mdata);
  });
}

// 查詢
function inquireData(table, condition, data, getAns) {
  let string = {};
  let mcondition = condition;
  const mdata = data;
  if (mcondition !== '') mcondition = `WHERE ${mcondition}`;
  database.query(`SELECT * FROM ${table} ${mcondition}`, (err, rows) => {
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
function inquireTwoData(table,tableTwo,condition, data, getAns) {
  let string = {};
  let mcondition = condition;
  const mdata = data;
  if (mcondition !== '') mcondition = `WHERE ${mcondition}`;
  database.query(`SELECT * FROM ${table} INNER JOIN ${tableTwo} ON ${table}.qa_id=${tableTwo}.id ${mcondition}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    string = JSON.stringify(rows);
    const array = JSON.parse(string);
     console.log("string="+string);
    mdata.content = array;
    getAns(mdata);
  });
}

// 增加
function addData(table, sql, data, getAns) {
  let string = {};
  const mdata = data;
  console.log(sql);
  
  
  database.query('INSERT INTO '+table+' SET ?',sql, (err, rows) => {
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
  database.query('DELETE FROM '+table+' WHERE ?',sql, (err, rows) => {
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
