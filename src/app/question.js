const fs = require('fs');
const { createRouter } = require('../wrapper/Exsocket');
const db = require('../utils/db');


const router = createRouter();

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.on('favorite_question', async (data) => {
  const sql = {
    book_id: data.book_id,
    qa_id: data.qa_id,
  };
  return db.addData('Book_Content', sql);
});

router.on('add_quiz', async (data) => {
  if (data.book_id === 5) {
    const quizs = await db.inquireQuiz('Quiz', 'id BETWEEN 7 AND 16');
    let max = 0;
    for (let i = 0; i < 10; i += 1) {
      const quiz = quizs[i];
      console.log(`quiz.id=${quiz.id}`);
      delete quiz.id;
      // eslint-disable-next-line no-await-in-loop
      const addstatus = await db.addData('Quiz', quiz);
      max = addstatus.insertId;
    }
    return db.inquireQuiz('Quiz', `id BETWEEN ${max - 9} AND ${max}`);
  }
  return { status: 'fail' };
});

router.on('show_quiz_content', async (data) => {
  const sql = {
    Quiz_Record_id: data.quiz_record_id,
  };
  return db.inquireTwoData('Quiz_Content', 'Quiz', 'Quiz_Content.Quiz_id = Quiz.id', sql);
});

router.on('add_quiz_record', async (data) => {
  const sql = {
    child_id: data.child_id,
    total_time: 10,
    name: data.name,
    amount: data.amount,
    correct_amount: data.correct_amount,
  };
  data.quizs.forEach((quiz) => {
    const dat = quiz;
    const { id } = quiz;
    delete sql.id;
    db.alterData('Quiz', dat, { id });
  });
  return db.addData('Quiz_Record', sql);
});

router.on('show_quiz_record', async (data) => {
  const sql = {
    child_id: data.child_id,
  };
  return db.inquireData('Quiz_Record', sql);
});

router.on('alter_book_content', async (data) => {
  const sql = data;
  const condition = {
    id: sql.id,
  };
  delete sql.id;
  return db.alterData('Book_Content', sql, condition);
});

router.on('show_past_question', async (data) => {
  const sql = {
    child_id: data.child_id,
  };
  return db.inquireData('QA', sql);
});

router.on('alter_book', async (data) => {
  const sql = data;
  const condition = {
    id: sql.id,
  };
  delete sql.id;
  return db.alterData('Book', sql, condition);
});

router.on('delete_past_question', async (data) => {
  const sql = {
    id: data.id,
  };
  return db.deleteData('QA', sql);
});

router.on('add_book', async (data) => {
  const sql = {
    child_id: data.child_id,
    name: data.name,
    category: data.category,
  };
  return db.addData('Book', sql);
});


router.on('show_book_content', async (data) => {
  const sql = {
    book_id: data.id,
  };
  return db.bookContentToQa(sql);
});

// 增加問問題的歷史紀錄
router.on('add_qa', async (data) => {
  let questionUrl = '';
  // let base64strSubstring = data.base64str.substring(3, 6);
  if (data.base64str.substring(0, 4) === 'http') {
    questionUrl = data.base64str;
  } else if (data.base64str !== null) {
    const base64Image = data.base64str.split(';base64,').pop();
    // ../WebSocket-JS/src/image/image
    // ../mcuim/WebSocket-JS/src/image/image
    const fileName = `image${makeid(4)}.png`;

    questionUrl = `http://growup.mcu.yokikiyo.space/images/${fileName}`;
    fs.writeFile(`../mcuim/WebSocket-JS/src/image/${fileName}`, base64Image, { encoding: 'base64' }, (err) => {
      console.log('File created');
      console.log(`err=${err}`);
    });
  }

  let pictureBookUrl = '';
  if (data.book_img.substring(0, 4) === 'http') {
    pictureBookUrl = data.base64str;
  } else if (data.book_img !== null) {
    const base64Image = data.book_img.split(';base64,').pop();
    // ../WebSocket-JS/src/image/image
    // ../mcuim/WebSocket-JS/src/image/image
    const fileName = `image${makeid(4)}.png`;
    pictureBookUrl = `http://growup.mcu.yokikiyo.space/images/${fileName}`;
    fs.writeFile(`../mcuim/WebSocket-JS/src/image/${fileName}`, base64Image, { encoding: 'base64' }, (err) => {
      console.log('File created');
      console.log(`err=${err}`);
    });
  }

  const sql = {
    child_id: data.child_id,
    question_text: data.question_text,
    answer: data.answer,
    keyword: data.keyword,
    question_url: questionUrl,
    category: data.category,
  };
  const pictureBookSql = {
    child_id: data.child_id,
    name: data.book_name,
    image: pictureBookUrl,
    introduction: data.book_introduction,
    recommend: '小孩',
  };
  db.addData('PictureBook', pictureBookSql);
  return db.addData('QA', sql);
});


router.on('delete_book', async (data) => {
  const sql = {
    id: data.id,
  };
  return db.deleteData('Book', sql);
});


router.on('show_book', async (data) => {
  const sql = {
    child_id: data.child_id,
  };
  return db.inquireData('Book', sql);
});

// 家長上傳推薦書籍
router.on('add_picture_book', async (data) => {
  let pictureBookUrl = '';
  if (data.image !== null) {
    const base64Image = data.image.split(';base64,').pop();
    // ../WebSocket-JS/src/image/image
    // ../mcuim/WebSocket-JS/src/image/image
    const fileName = `image${makeid(4)}.png`;
    pictureBookUrl = `http://growup.mcu.yokikiyo.space/images/${fileName}`;
    fs.writeFile(`../mcuim/WebSocket-JS/src/image/${fileName}`, base64Image, { encoding: 'base64' }, (err) => {
      console.log('File created');
      console.log(`err=${err}`);
    });
  }

  const pictureBookSql = {
    child_id: data.child_id,
    name: data.book_name,
    image: pictureBookUrl,
    introduction: data.book_introduction,
    recommend: '家長',
  };
  return db.addData('PictureBook', pictureBookSql);
});

// 查詢推薦書籍
router.on('show_picture_book', async (data) => {
  const sql = {
    child_id: data.child_id,
  };
  return db.inquireData('PictureBook', sql);
});

router.on('add_book_content', async (data) => {
  const sql = {
    book_id: data.book_id,
    qa_id: data.qa_id,
  };
  return db.addData('Book_Content', sql);
});

router.on('delete_book_content', async (data) => {
  const sql = {
    id: data.id,
  };
  return db.deleteData('Book_Content', sql);
});

module.exports = router;
