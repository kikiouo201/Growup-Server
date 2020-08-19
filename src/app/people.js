const { createRouter } = require('../wrapper/Exsocket');
const db = require('../utils/db');

const router = createRouter();


router.on('sign_in_parent', async (req) => db.inquireAccount('Parent', { account: req.account }, { password: req.password }));

router.on('alter_parent', async (req) => {
  const { id, ...params } = req;
  // const sql = data;
  // const condition = {
  //   id: sql.id,
  // };
  // delete sql.id;
  return db.alterData('Parent', params, { id });
});

router.on('add_parent', async (data) => {
  const sql = {
    name: data.name,
    account: data.account,
    password: data.password,
  };


  return db.addData('Parent', sql);
});

router.on('show_child', async (data) => {
  const sql = {
    parent_id: data.parent_id,
  };
  return db.inquireTwoData('Child_Parent', 'Child', 'Child_Parent.child_id = Child.id', sql);
});

router.on('show_child_position', async (data) => {
  const sql = {
    child_id: data.child_id,
  };
  return db.inquireData('GPS', sql);
});

router.on('alter_child_position', async (data) => {
  const sql = data;
  const condition = {
    child_id: sql.child_id,
  };
  delete sql.child_id;
  return db.alterData('GPS', sql, condition);
});

router.on('show_child_key', async (data) => {
  const sql = {
    child_key: data.child_key,
  };
  return db.inquireData('Child', sql);
});

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.on('add_child', async (data) => {
  let sql = {
    name: data.name,
    birthday: data.birthday,
    photo: data.photo,
    child_key: makeid(10),
  };
  const addData = await db.addData('Child', sql);
  console.log(addData);
  console.log(addData.insertId);
  sql = {
    child_id: addData.insertId,
    parent_id: data.parent_id,
  };
  db.addData('Child_Parent', sql);

  return { child_key: makeid(20) };
});

router.on('delete_child', async (data) => {
  const sql = {
    id: data.child_id,
  };

  return db.deleteData('Child', sql);
});

router.on('alter_child', async (data) => {
  const sql = data;
  const condition = {
    id: sql.id,
  };
  delete sql.id;
  return db.alterData('Child', sql, condition);
});

module.exports = router;
