const connectmysql = require('./connectMysql');


const FAVORITE_PLACE = 'favorite_place';
function favoritePlace(text, getAns) {
  const data = JSON.parse(text);
  connectmysql.inquireData('QA', '', data, getAns);
  //  console.log("str:"+context.child_id);
}

const FAVORITE_QUESTION = 'favorite_question';
function favoriteQuestion(text, getAns) {
  const data = JSON.parse(text);
  connectmysql.inquireData('QA', 'id = 1', data, getAns);
}

const SHOW_PAST_QUESTION = 'show_past_question';
function showPastQuestion(text, getAns) {
  const data = JSON.parse(text);
  connectmysql.inquireData('QA', '', data, getAns);
}

const SHOW_BOOK_CONTENT = 'show_past_question';
function showBookContent(text, getAns) {
  const data = JSON.parse(text);
  connectmysql.inquireData('QA', 'category = "知識"', data, getAns);
}

const ADD_QA = 'add_qa';
function addQa(text, getAns) {
  const data = JSON.parse(text);
  const textt = 'req.body.name';
  const cate = '知識';
  const sql = {
    child_id: 1,
    question_text: textt,
    answer: textt,
    category: cate,
  };
  connectmysql.addData('QA', sql, data, getAns);
}

const ADD_BOOK_CONTENT = 'add_book_content';
function addBookContent(text, getAns) {
  const data = JSON.parse(text);
  const str = data.content;
  const dt = new Date();
  const sql = {
    book_id: str.book_id,
    qa_id: str.qa_id,
    created_at: dt,
    update_at: dt,
  };
  connectmysql.addData('Book_Content', sql, data, getAns);
}

const DELETE_BOOK_CONTENT = 'show_past_question';
function deleteBookContent(text, getAns) {
  const data = JSON.parse(text);
  connectmysql.inquireData('QA', "category = '知識'", data, getAns);
}

const event = [{
  event: FAVORITE_PLACE,
  callback: favoritePlace,
}, {
  event: FAVORITE_QUESTION,
  callback: favoriteQuestion,
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
},
];
module.exports = {
  favorite: favoritePlace,
  event,
};
