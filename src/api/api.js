const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const port = 1812;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))



const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'doan'
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

//API lay danh muc san pham
app.get('/api/danhmucsanpham',(req,res)=>{
    var sql = "SELECT * FROM danhmucsp";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})
//API them danh muc moi
app.post('/api/danhmucsanpham/themdanhmuc',(req,res)=>{
    var sql = "INSERT INTO danhmucsp(LoaiSP,TrangThai)"
            + "VALUES('"
            + req.body.LoaiSP + "','"
            + req.body.TrangThai + "')";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API xoa danh muc san pham
app.put('/api/danhmucsanpham/xoadanhmuc/:madm',(req,res)=>{
    var sql = "UPDATE danhmucsp SET TrangThai='" + 0 + "'"
            + "WHERE MaDM='" + req.params.madm + "'";
    connection.query(sql,(err,results)=>{
        if (err) throw err;
        res.json(results);
    })
})
//API phuc hoi danh muc san pham
app.put('/api/danhmucsanpham/phuchoidanhmuc/:madm',(req,res)=>{
    var sql = "UPDATE danhmucsp SET TrangThai='" + 1 + "'"
            + "WHERE MaDM='" + req.params.madm + "'";
    connection.query(sql,(err,results)=>{
        if (err) throw err;
        res.json(results);
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

//API set lai TrangThai nguoi dung = 0

app.put('/api/taikhoan/xoaTK/:id',(req,res)=>{
    var sql = "UPDATE taikhoan SET TrangThai='"
            + 0 +"'"
            + "WHERE MaTK='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API set lai TrangThai nguoi dung = 0

app.put('/api/taikhoan/khoiphucTK/:id',(req,res)=>{
    var sql = "UPDATE taikhoan SET TrangThai='"
            + 1 +"'"
            + "WHERE MaTK='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API cap nhat thong tin nguoi dung
app.put('/api/taikhoan/capnhatTK/:id',(req,res)=>{
    var sql = "UPDATE taikhoan SET "
            + "HoTen='"      +   req.body.HoTen  + "',"
            + "DiaChi='"     +   req.body.DiaChi  + "',"
            + "SDT='"        +   req.body.SoDienThoai  + "',"
            + "MatKhau='"    +   req.body.MatKhau   + "'"
            + "WHERE MaTK='" +   req.params.id  + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//SANPHAM

//API cap nhat trang thai cho san pham 
app.put('/api/sanpham/capnhatSP/:id',(req,res)=>{
    var sql = "UPDATE sanpham SET TrangThai='"
            + 0 +"'"
            + "WHERE MaSP='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API khoi phuc san pham 
app.put('/api/sanpham/khoiphucSP/:id',(req,res)=>{
    var sql ="UPDATE sanpham SET TrangThai='"
            + 1 +"'"
            + "WHERE MaSP='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API Them San Pham 

app.post('/api/sanpham/themSP',(req,res)=>{
    var sql = "INSERT "
            + "INTO sanpham(MaSP,MaDM,MaHang,TenSP,LuotBan,LuotXem,Gia,SanPham_Moi,TrangThai,Hinh)"
            + "VALUES('"
            + req.body.MaSP + "','"
            + req.body.LoaiSP + "','"
            + req.body.HangSX + "','"
            + req.body.TenSP + "','"
            + req.body.LuotBan + "','"
            + req.body.LuotXem +"','"
            + req.body.Gia + "','"
            + req.body.SPMoi + "','"
            + 1 + "','"
            + req.body.Hinh + "')";
  
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })

})

//API cap nhat thong tin san pham 
app.put('/api/sanpham/capNhatThongTin/:sp',(req,res)=>{
    var sql = "UPDATE sanpham SET "
            + "MaDM='"      +   req.body.MaDM  + "',"
            + "MaHang='"     +   req.body.MaHang  + "',"
            + "TenSP='"        +   req.body.TenSP  + "',"
            + "Gia='"    +   req.body.Gia + "'"
            + "SanPham_Moi='"    +   req.body.SanPham_Moi + "'"
            + "ThongTinSP='"    +   req.body.ThongTinSP + "'"
            + "TrangThai='"    +   req.body.TrangThai + "'"
            + "Hinh='"    +   req.body.Hinh + "'"
            + "WHERE MaSP='" +   req.params.sp  + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})



app.listen(port,()=>console.log(`App listening on port ${port}`));
