const mysql=require('mysql');
const Question = require('./question');
const con = require('./conn.js');

var conn = mysql.createConnection(con.mysqldata);

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
    function inquireData(table,condition,data,getAns){
        let string={};
        let d="QA";
        if(condition !="")
        condition="WHERE "+condition;
        conn.query('SELECT * FROM '+table+" "+condition, function(err, rows) {
            if (err) {
                console.log(err);
            }
            
          
            string=JSON.stringify(rows); 
            let array=JSON.parse(string);
            console.log("string="+string);
            let str="";
            data.content=array;
            getAns(data);
        });
        
    }

    function addData(table,sql,data,getAns){
        let string={};
        conn.query('INSERT INTO '+table+' SET ? ', sql, function(err, rows) {
            if (err) {
                console.log(err);
            }

            string=JSON.stringify(rows); 
            let array=JSON.parse(string);
            console.log("string="+string);
           // let str="";
           // data.content=array;
           // getAns(data);
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
    addData:addData,
    closeConnect:closeConnect
}
    