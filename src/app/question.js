const { createRouter } = require('../wrapper/Exsocket');
const db = require('../utils/db');

const router = createRouter();

router.on('favorite_question', async (data) => {
  const dt = new Date();
  const sql = {
    book_id: data.book_id,
    qa_id: data.qa_id,
    created_at: dt,
    update_at: dt,
  };
  return db.addData('Book_Content', sql);
});

router.on('show_child', async (data) => {
  const sql = {
    parent_id: data.parent_id,
  };
  return db.inquireTwoData('Child_Parent', 'Child', 'Child_Parent.child_id = Child.id', sql);
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

// router.on('alter_book_content', async (data) => {
//   const sql = data;
//   const condition = {
//     id: sql.id,
//   };
//   delete sql.id;
//   return db.alterData('Book_Content', sql, condition);
// });

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
  const dt = new Date();
  const sql = {
    child_id: data.child_id,
    name: data.name,
    category: data.category,
    created_at: dt,
    update_at: dt,
  };
  return db.addData('Book', sql);
});


router.on('show_book_content', async (data) => {
  const sql = {
    book_id: data.id,
  };
  return db.bookContentToQa(sql);
});

router.on('add_qa', async (data) => {
  const dt = new Date();
  const sql = {
    child_id: data.child_id,
    question_text: data.question_text,
    answer: data.answer,
    question_url: data.question_url,
    category: data.category,
    created_at: dt,
    update_at: dt,
  };
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

router.on('add_book_content', async (data) => {
  const dt = new Date();
  const sql = {
    book_id: data.book_id,
    qa_id: data.qa_id,
    created_at: dt,
    update_at: dt,
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
