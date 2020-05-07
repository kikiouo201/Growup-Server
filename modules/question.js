const connectmysql= require('./connectMysql');

let favorite_place='favorite_place';

let sql_data=[{event:'yo'}];

 function place(text,getAns){
    
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","",data,getAns);

    console.log("str:"+context.child_id);
   
}     

let favorite_question='favorite_question';
function question(text){
    
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","id = 1",data,getAns);
   
}

const SHOW_past_question='show_past_question';
function show_past_question(text,getAns){
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","category = '知識'",data,getAns); 
   
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

