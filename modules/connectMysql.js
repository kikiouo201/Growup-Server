const mysql=require('mysql');
const Question = require('./question');
var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Mymy2136',
    database : 'Blog'
    });

    function createConnection(){
        conn.connect(function(err){
            if(err) throw err;
            console.log('connect success!');
        });
    }
  //修改
    function alterData(sql,id){
        conn.query('UPDATE article SET ? WHERE id = ?', [sql, id], function(err, rows) {
            if (err) {
                console.log(err);
            }

        });

    }
   
  //查詢
    function inquireData(id,data,getAns){
        let string={};
        let d="article";
        conn.query('SELECT * FROM '+d+' WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(err);
            }
            
          
            string=JSON.stringify(rows); 
            let array=JSON.parse(string);
            console.log("string="+string);
            data.content=array[0];
            getAns(data);
        });
        
    }

    function addData(sql){
        conn.query('INSERT INTO article SET?', sql, function(err, rows) {
            if (err) {
                console.log(err);
            }
            console.log(rows);
        });
    }

    function deleteData(id){
        conn.query('DELETE FROM article WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(err);
            }
            console.log('Delete 200 ok');
        });
    }

    function closeConnect(){
        // 關閉連線時呼叫
        conn.end(function(err){
            if(err) throw err;
            console.log('connect end');
        });
    }
    

module.exports = {
    createConnection:createConnection,
    inquireData:inquireData,
    closeConnect:closeConnect
}
    