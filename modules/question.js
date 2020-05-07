const connectmysql= require('./connectMysql');

let favorite_place='favorite_place';

let sql_data=[{event:'yo'}];

 function place(text,getAns){
    
    const data= JSON.parse(text);
    const context=data.content;
    let sql="{'sql':'INSERT INTO article SET WHERE child_id="+context.child_id+"}";
   

     connectmysql.inquireData(context.child_id,data,getAns);
    
        // const list='{sql:'+JSON.stringify(str)+'}';
        // console.log("str:"+context.child_id);
   
}     

let favorite_question='favorite_question';
function question(text){
    
    const data= JSON.parse(text);
    const context=data.content;
    let sql="{'sql':'INSERT INTO article SET WHERE id="+context.child_id+"}";
   
}

const SHOW_past_question='show_past_question';
function show_past_question(text,getAns){
    const data= JSON.parse(text);
    const context=data.content;
    let ans=[ 
        {
            question_id: '1001', 
            question_text: '為什麼天空是藍的?', 
            answer: '晴朗的天空是蔚藍色的，這並不是因為大氣本身是藍色的，也不是大氣中含有藍色的物質，而是由于大氣分子和懸浮在大氣中的微小粒子對太陽光散射的結果。'
        },{
            question_id: '2001', 
            question_text: '鸚鵡是什麼?', 
            answer: '產於熱帶的一種鳥。'
        },{
            question_id: '3001', 
            question_text: '（這是一張水杯的圖片)',
            answer: '水杯'
        },{
            question_id: '2002', 
            question_text: '早安是什麼意思?', 
            answer: '早晨見面時互相招呼的用語。'
        },{
            question_id: '3002', 
            question_text: '（這是一張鸚鵡的圖片)', 
            answer: '鸚鵡'
        }]
    
        data.content=ans;
        getAns(data);   
   
}


var event=[
    {
        event:favorite_place,
        callback:place
    },{
        event:favorite_question,
        callback:question
    },{
        event:SHOW_past_question,
        callback:show_past_question
    }
]
module.exports = {
    favorite:place,
    event:event,
    sql_data:sql_data
};

