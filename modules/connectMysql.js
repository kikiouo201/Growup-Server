const Mysql = require('mysql');
// eslint-disable-next-line node/no-unpublished-require,import/no-unresolved,node/no-missing-require
const config = require('../.config.js');

const database = Mysql.createConnection(config.mysql);


database.connect((err) => {
  if (err) throw err;
  console.log('connect success!');
});


// 修改
function alterData(table, sql, condition, data) {
  return new Promise((resolve, reject) => {
    const mdata = data;
    database.query(`UPDATE ${table} SET ? WHERE ? `, [sql, condition], (err, rows) => {
      if (err) {
        reject();
        console.log(err);
      }
      mdata.content = rows;
      resolve(mdata);
    });
  });
}


// 查詢
function inquireData(table, sql, data) {
  return new Promise((resolve, reject) => {
    const mdata = data;
    database.query(`SELECT * FROM ${table} WHERE ?`, sql, (err, rows) => {
      if (err) {
        reject();
        console.log(err);
      }
      mdata.content = rows;
      resolve(mdata);
    });
  });
}


// 查詢
function inquireTwoData(sql, data) {
  return new Promise((resolve, reject) => {
    const mdata = data;
    database.query('SELECT * FROM Book_Content INNER JOIN QA ON Book_Content.qa_id=QA.id  WHERE ?', sql, (err, rows) => {
      if (err) {
        reject();
        console.error(err);
      }
      mdata.content = rows;
      resolve(mdata);
    });
  });
}

// 增加
function addData(table, sql, data) {
  return new Promise((resolve, reject) => {
    const mdata = data;
    console.log(sql);
    database.query(`INSERT INTO ${table} SET ?`, sql, (err, rows) => {
      if (err) {
        reject();
        console.log(err);
      }
      mdata.content = rows;
      resolve(mdata);
    });
  });
}


function deleteData(table, sql, data) {
  return new Promise((resolve, reject) => {
    const mdata = data;
    database.query(`DELETE FROM ${table} WHERE ?`, sql, (err, rows) => {
      if (err) {
        reject();
        console.log(err);
      }
      console.log('Delete 200 ok');
      mdata.content = rows;
      resolve(mdata);
    });
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
  inquireData,
  inquireTwoData,
  addData,
  closeConnect,
  deleteData,
  alterData,
};
