const connectMysql = require('./connectMysql');


const FAVORITE_QUESTION = 'favorite_question';
async function favoriteQuestion(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const dt = new Date();
  const sql = {
    book_id: mcontent.book_id,
    qa_id: mcontent.qa_id,
    created_at: dt,
    update_at: dt,
  };
  const result = await connectMysql.addData('Book_Content', sql, data, getAns);
  return result;
}


const SHOW_PAST_QUESTION = 'show_past_question';
async function showPastQuestion(text) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    child_id: mcontent.child_id,
  };
  const result = await connectMysql.inquireData('QA', sql, data);
  return result;
  // connectMysql.inquire('QA', sql, data).then((rusult) => {
  //   // console.log(`rusult= ${JSON.stringify(rusult)}`);
  //   resolve(rusult);
  // }).catch((err) => {
  //   reject(err);
  // });
}


const ALTER_BOOK_CONTENT = 'alter_book_content';
async function alterBookContent(text, getAns) {
  const data = JSON.parse(text);
  const sql = data.content;
  const condition = {
    id: sql.id,
  };
  delete sql.id;
  const result = await connectMysql.alterData('Book_Content', sql, condition, data, getAns);
  return result;
}


const ALTER_BOOK = 'alter_book';
async function alterBook(text, getAns) {
  const data = JSON.parse(text);
  const sql = data.content;
  const condition = {
    id: sql.id,
  };
  delete sql.id;
  const result = await connectMysql.alterData('Book', sql, condition, data, getAns);
  return result;
}


const DELETE_PAST_QUESTION = 'delete_past_question';
async function deletePastQuestion(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    id: mcontent.id,
  };
  const result = await connectMysql.deleteData('QA', sql, data, getAns);
  return result;
}

const ADD_BOOK = 'add_book';
async function addBook(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const dt = new Date();
  const sql = {
    child_id: mcontent.child_id,
    name: mcontent.name,
    category: mcontent.category,
    created_at: dt,
    update_at: dt,
  };
  const result = await connectMysql.addData('Book', sql, data, getAns);
  return result;
}


const SHOW_BOOK_CONTENT = 'show_book_content';
async function showBookContent(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    book_id: mcontent.id,
  };
  const result = await connectMysql.inquireTwoData(sql, data, getAns);
  return result;
}

const ADD_QA = 'add_qa';
async function addQa(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;

  const sql = {
    child_id: mcontent.child_id,
    question_text: mcontent.question_text,
    answer: mcontent.answer,
    question_url: mcontent.question_url,
    category: mcontent.category,
  };
  const result = await connectMysql.addData('QA', sql, data, getAns);
  return result;
}

const DELETE_BOOK = 'delete_book';
async function deleteBook(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    id: mcontent.id,
  };
  const result = await connectMysql.deleteData('Book', sql, data, getAns);
  return result;
}

const SHOW_BOOK = 'show_book';
async function showBook(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    child_id: mcontent.child_id,
  };
  const result = await connectMysql.inquireData('Book', sql, data, getAns);
  return result;
}
const ADD_BOOK_CONTENT = 'add_book_content';
async function addBookContent(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const dt = new Date();
  const sql = {
    book_id: mcontent.book_id,
    qa_id: mcontent.qa_id,
    created_at: dt,
    update_at: dt,
  };
  const result = await connectMysql.addData('Book_Content', sql, data, getAns);
  return result;
}


const DELETE_BOOK_CONTENT = 'delete_book_content';
async function deleteBookContent(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    id: mcontent.id,
  };
  const result = await connectMysql.deleteData('Book_Content', sql, data, getAns);
  return result;
}

const eventQueue = [{
  event: FAVORITE_QUESTION,
  callback: favoriteQuestion,
}, {
  event: ADD_BOOK,
  callback: addBook,
}, {
  event: SHOW_BOOK,
  callback: showBook,
}, {
  event: DELETE_BOOK,
  callback: deleteBook,
}, {
  event: SHOW_PAST_QUESTION,
  callback: showPastQuestion,
}, {
  event: ALTER_BOOK,
  callback: alterBook,
}, {
  event: ALTER_BOOK_CONTENT,
  callback: alterBookContent,
}, {
  event: ADD_QA,
  callback: addQa,
}, {
  event: ADD_BOOK_CONTENT,
  callback: addBookContent,
}, {
  event: SHOW_BOOK_CONTENT,
  callback: showBookContent,
}, {
  event: DELETE_BOOK_CONTENT,
  callback: deleteBookContent,
}, {
  event: DELETE_PAST_QUESTION,
  callback: deletePastQuestion,
},
];
module.exports = {
  eventQueue,
};
