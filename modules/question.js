const connectmysql= require('./connectMysql');



let sql_data=[{event:'yo'}];
let Favorite_place='favorite_place';
function favorite_place(text,getAns){
    
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","",data,getAns);
  //  console.log("str:"+context.child_id);
   
}     

let Favorite_question='favorite_question';
function favorite_question(text,getAns){
    
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","id = 1",data,getAns);
   
}

const Show_past_question='show_past_question';
function show_past_question(text,getAns){
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","",data,getAns); 
   
}

const Show_book_content='show_past_question';
function show_book_content(text,getAns){
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","category = '知識'",data,getAns); 
   
}

const Add_qa='add_qa';
function add_qa(text,getAns){
    const data= JSON.parse(text);
    let textt="req.body.name";
    let cate="知識";
    let no="";
    let sql = {
        child_id:1,
        question_text: textt,
        answer: textt,
        category: cate

    };
    connectmysql.addData("QA",sql,data,getAns); 
    
}

const Add_book_content='add_book_content';
function add_book_content(text,getAns){
    const data= JSON.parse(text);
    let str=data.content;
    let book=str.book_id;
    let qa=str.qa_id;
    let dt = new Date();
    let sql = {
        book_id:book,
        qa_id: qa,
        created_at:dt,
        update_at:dt

    };
    
    connectmysql.addData("Book_Content",sql,data,getAns); 
}

const Delete_book_content='show_past_question';
function delete_book_content(text,getAns){
    const data= JSON.parse(text);
    connectmysql.inquireData("QA","category = '知識'",data,getAns); 
   
}

var event=[
    {
        event:Favorite_place,
        callback:favorite_place
    },{
        event:Favorite_question,
        callback:favorite_question
    },{
        event:Show_past_question,
        callback:show_past_question
    },{
        event:Add_qa,
        callback:add_qa
    },{
        event:Add_book_content,
        callback:add_book_content
    }
]
module.exports = {
    favorite:favorite_place,
    event:event,
    sql_data:sql_data
};

