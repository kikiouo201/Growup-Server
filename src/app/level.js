const { createRouter } = require('../wrapper/Exsocket');
const db = require('../utils/db');

const router = createRouter();

// 展示注音關卡進度
router.on('show_level', async (data) => {
  const sql = {
    child_id: data.child_id,
  };
  return db.inquireData('ZhuyinLevel', sql);
});

// 完成某關注音關卡
router.on('alter_level', async (data) => {
  const sql = data;
  const condition = {
    child_id: sql.child_id,
    level_name: sql.level_name,
  };
  delete sql.id;
  delete sql.level_name;
  return db.alterData('ZhuyinLevel', sql, condition);
});

//
module.exports = router;
