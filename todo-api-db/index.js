const express = require("express");
const app = express();
const mysql = require("mysql");

// middleware
app.use(express.json());


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,DELETE");
    res.header("Access-Control-Allow-Headers","Origin, Content-Type, Accept");
    next();
});

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password:"yxcv",
    database:"todo"
});

db.connect((err) => {
    if(err) throw err;
    console.log("Connected to database");
});

app.get('api/todos',(req,res) => {
    // Sql query
    const sql = 'SELECT * FROM todos';
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.json(result);
    })
});

app.post('/api/todos', (req,res) => {
    const todo = req.body;
    const sql = 'INSERT INTO todos (title,status) VALUES (?,?)';
    db.query(sql,[todo.title,todo.status],(err,result) =>{
        if(err) throw err;
        res.json({message: 'Todo added successfully'});
    }); 
})

const port = 3000;

app.listen(port, function(){
    console.log(`API listening on http://localhost:${port}`);
});