const connectMysql = require('./connectMysql');


const FAVORITE_PLACE = 'favorite_place';
function favoritePlace(text, getAns) {
  const data = JSON.parse(text);
  connectMysql.inquireData('QA', '', data, getAns);
  //  console.log("str:"+context.child_id);
}

const FAVORITE_QUESTION = 'favorite_question';
function favoriteQuestion(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const dt = new Date();
  const sql = {
    book_id: mcontent.book_id,
    qa_id: mcontent.qa_id,
    created_at: dt,
    update_at: dt,
  };
  connectMysql.addData('Book_Content', sql, data, getAns);
}



const SHOW_PAST_QUESTION = 'show_past_question';
function showPastQuestion(text, getAns) {
  const data = JSON.parse(text);
  connectMysql.inquireData('QA', '', data, getAns);
}
const DELETE_PAST_QUESTION = 'delete_past_question';
function deletePastQuestion(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    id: mcontent.id,
  };
  connectMysql.deleteData('QA', sql, data, getAns);
}

const ADD_BOOK = 'add_book';
function addBook(text, getAns) {
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
  connectMysql.addData('Book', sql, data, getAns);
}


const SHOW_BOOK_CONTENT = 'show_book_question';
function showBookContent(text, getAns) {
  const data = JSON.parse(text);
  connectMysql.inquireData('QA', 'category = "知識"', data, getAns);
}

const ADD_QA = 'add_qa';
function addQa(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
 
  const sql = {
    child_id: mcontent.child_id,
    question_text: mcontent.question_text,
    answer: mcontent.answer,
    question_url:mcontent.question_url,
    category: mcontent.category,
  };
  connectMysql.addData('QA', sql, data, getAns);
}

const DELETE_BOOK = 'delete_book';
function deleteBook(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    id: mcontent.id,
  };
  connectMysql.deleteData('Book', sql, data, getAns);
}

const SHOW_BOOK = 'show_book';
function showBook(text, getAns) {
  const data = JSON.parse(text);
  connectMysql.inquireData('Book', '', data, getAns);
}
const ADD_BOOK_CONTENT = 'add_book_content';
function addBookContent(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const dt = new Date();
  const sql = {
    book_id: mcontent.book_id,
    qa_id: mcontent.qa_id,
    created_at: dt,
    update_at: dt,
  };
  connectMysql.addData('Book_Content', sql, data, getAns);
}

const DELETE_BOOK_CONTENT = 'delete_book_content';
function deleteBookContent(text, getAns) {
  const data = JSON.parse(text);
  const mcontent = data.content;
  const sql = {
    id: mcontent.id,
  };
  connectMysql.deleteData('Book_Content', sql, data, getAns);
}

const eventQueue = [{
  event: FAVORITE_PLACE,
  callback: favoritePlace,
}, {
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
  favorite: favoritePlace,
  eventQueue,
};
