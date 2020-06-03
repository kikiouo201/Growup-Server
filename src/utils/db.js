const mysql = require('mysql');
const debug = require('./debug');
// eslint-disable-next-line node/no-unpublished-require,import/no-unresolved,node/no-missing-require
const config = require('../../.config.js');


const database = mysql.createConnection(config.mysql);

const log = debug('mysql =>');

database.connect((err) => {
  if (err) throw err;
  log('connect success!');
});

// 修改
function alterData(table, data, condition) {
  return new Promise((resolve, reject) => {
    database.query(`UPDATE ${table} SET ? WHERE ? `, [data, condition], (err, rows) => {
      if (err) {
        reject(err);
        log(err);
      }
      resolve(rows);
    });
  });
}


// 查詢
function inquireData(table, condition) {
  return new Promise((resolve, reject) => {
    database.query(`SELECT * FROM ${table} WHERE ?`, condition, (err, rows) => {
      if (err) {
        reject(err);
        log(err);
      }
      resolve(rows);
    });
  });
}

function inquireTwoData(table1, table2, on, condition) {
  return new Promise((resolve, reject) => {
    database.query(`SELECT * FROM ${table1} INNER JOIN ${table2} ON ${on}  WHERE ?`, condition, (err, rows) => {
      if (err) {
        reject(err);
        log(err);
      }
      resolve(rows);
    });
  });
}


function bookContentToQa(condition) {
  return new Promise((resolve, reject) => {
    database.query('SELECT * FROM Book_Content INNER JOIN QA ON Book_Content.qa_id=QA.id  WHERE ?', condition, (err, rows) => {
      if (err) {
        reject(err);
        log(err);
      }
      resolve(rows);
    });
  });
}


// 增加
function addData(table, data) {
  return new Promise((resolve, reject) => {
    database.query(`INSERT INTO ${table} SET ?`, data, (err, rows) => {
      if (err) {
        reject();
        log(err);
      }
      resolve(rows);
    });
  });
}

// 刪除
function deleteData(table, condition) {
  return new Promise((resolve, reject) => {
    database.query(`DELETE FROM ${table} WHERE ?`, condition, (err, rows) => {
      if (err) {
        reject(err);
        log(err);
      }
      resolve(rows);
    });
  });
}


module.exports = {
  inquireData,
  inquireTwoData,
  bookContentToQa,
  addData,
  deleteData,
  alterData,
};
