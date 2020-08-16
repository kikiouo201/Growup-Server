const { createRouter } = require('../wrapper/Exsocket');
const db = require('../utils/db');

const router = createRouter();

// 展示注音關卡進度
router.on('show_zhuyin_level', async (data) => {
  const sql = data;
  const condition = {
    id: sql.id,
  };
  delete sql.id;
  return db.alterData('ZhuyinLevel', sql, condition);
});

// 完成某關注音關卡
router.on('alter_zhuyin_level', async (data) => {
  const sql = data;
  const condition = {
    child_id: sql.child_id,
    level_name: sql.level_name,
  };
  delete sql.id;
  delete sql.level_name;
  return db.alterData('ZhuyinLevel', sql, condition);
});


module.exports = router;
