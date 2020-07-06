const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))



const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ttgshop'
});

connection.connect(function(err){
    (err)?console.log(err):console.log(connection);
})

app.use(cors());

app.get('/api/taikhoan',(req,res)=>{
    var sql = "SELECT * FROM taikhoan";
    connection.query(sql,function(err,results){
        if(err) throw err;
        res.json(results)
    })
})

//API tai khoan
app.get('/api/sanpham',(req,res)=>{
    var sql = "SELECT * FROM sanpham";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})

//API them tai khoan nguoi dung
app.post('/api/themtaikhoan',(req,res)=>{
    var sql = "INSERT "
            + "INTO taikhoan(MaTK,HoTen,Email,SDT,MatKhau,isAdmin,TrangThai)"
            + "VALUES('"
            + req.body.MaTK + "','"
            + req.body.HoTen + "','"
            + req.body.Email + "','"
            + req.body.SDT +"','"
            + req.body.MatKhau + "','"
            + 0 + "','"
            + 1 + "')";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API xoa tai khoan nguoidung
app.delete('/api/:id',(req,res)=>{
    var sql = "DELETE FROM taikhoan WHERE MaTK='"+req.params.id+"'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API xoa tai khoan nguoidung nhung thuc chat la update trang thai

app.put('/api/taikhoan/:id',(req,res)=>{
    var sql = "UPDATE taikhoan SET TrangThai='"
            + 0 +"'"
            + "WHERE MaTK='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})


app.listen(5005,()=>console.log('App listening on port 5005'));
