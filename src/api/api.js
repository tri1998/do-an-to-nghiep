
const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { response } = require('express');
const port = 5005;

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


//api dang nhap
app.post('/api/taikhoan/dangnhap',(req,res)=>{
    const data = req.body;
    const user = {
        "email":data.email,
        "password":data.password
    }
    var sql = `SELECT * FROM taikhoan WHERE Email='${user.email}' AND MatKhau='${user.password}'`;
    connection.query(sql,(err,results)=>{
        const Loi="Sai ten tai khoan , mat khau";
        if(err) throw err;
        if(results.length===0)
        {
            res.json(Loi);
        }
        else {
            if(results[0].isAdmin===1)
            {
                res.json(results);
            }
            if(results[0].isAdmin===1)
            {
                res.json(results);
            }
            const token = jwt.sign(user,'secretkey');
            const response = {
                "data":results,
                "token":token
            }
            res.json(response);
        }

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
    var sql = "INSERT INTO danhmucsp(MaDM,LoaiSP,LoaiSPurl,TrangThai)"
            + "VALUES('"
            + req.body.MaDM + "','"
            + req.body.LoaiSP + "','"
            + req.body.LoaiSPurl + "','"
            + req.body.TrangThai + "')";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API sua danh muc cua san pham
app.put('/api/danhmucsanpham/suadanhmuc/:madm',(req,res)=>{
    var sql = "UPDATE danhmucsp SET "
            + "LoaiSP='" + req.body.LoaiSP + "',"
            + "LoaiSPurl='" + req.body.LoaiSPurl + "' WHERE MaDM='" + req.params.madm + "'";
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

//API xem chi tiet san pham
app.get('/api/sanpham/xemChiTietSP/:id',(req,res)=>{
    let maSanPham = req.params.id;
    var sql = `SELECT * FROM sanpham WHERE MaSP = '${maSanPham}'`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API tim kiem san pham theo ten
app.get('/api/sanpham/timKiemSPTheoTen/:sp',(req,res)=>{
    var sql = "SELECT * FROM sanpham WHERE TenSP like '%"
            + req.params.sp
            + "%'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API tim kiem san pham theo gia
app.get('/api/sanpham/timKiemSPTheoGia/:gia',(req,res)=>{
    let Gia = parseInt(req.params.gia);
    var sql = `SELECT * FROM sanpham WHERE Gia >= ${Gia}`
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
            + req.body.MaDM + "','"
            + req.body.MaHang + "','"
            + req.body.TenSP + "','"
            + req.body.LuotBan + "','"
            + req.body.LuotXem +"','"
            + req.body.Gia + "','"
            + req.body.SanPham_Moi + "','"
            + req.body.TrangThai + "','"
            + req.body.Hinh + "')";
  
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })

})

//API cap nhat thong tin san pham 
app.put('/api/sanpham/capNhatThongTin/:maSanPham',(req,res)=>{
    var sanPham = req.body;
    var sql = `
                UPDATE sanpham SET 
                MaDM='${sanPham.MaDM}',
                MaHang='${sanPham.MaHang}',
                TenSP='${sanPham.TenSP}',
                Gia='${sanPham.Gia}',
                SanPham_Moi='${sanPham.SanPham_Moi}',
                ThongTinSP='${sanPham.ThongTinSP}',
                TrangThai='${sanPham.TrangThai}',
                Hinh='${sanPham.Hinh}' 
                WHERE MaSP='${sanPham.MaSP}'`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})



app.listen(port,()=>console.log(`App listening on port ${port}`));
