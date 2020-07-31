
const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
let config = require('./config');
const { response } = require('express');
const port = 5559;

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

//API DANG NHAP VOI JWT(JASON WEB TOKEN) VI DU
app.post('/authenticate',(req,res)=>{
    let user = req.body;
    if(user.username==="tri")
    {
        if(user.password===18121998)
        {
            const payload = {
                check:true
            }
            var token = jwt.sign(payload,config.secret,{
                expiresIn:1440
            })

            res.json({
                message:'authentication done',
                token:token
            })
        }
        else res.json({message:"please check your password !"})
    }
    else
    {
        res.json({message:"user not found !"})
    }
})

const ProtectedRoutes = express.Router();
app.use('/taikhoan',ProtectedRoutes);
ProtectedRoutes.use((req,res,next)=>{
    //kiem tra header co token ko 
    let token = req.headers['access-token'];

    //phan giai token
    if(token)
    {
        jwt.verify(token,config.secret,(err,decoded)=>{
            if(err)
            {
                return res.json({message:'token khong hop le'});
            }
            else {
                //moi thu ok ?
                req.decoded = decoded;
                next();
            }
        })
    } else{
        //neu khong co token
        res.send({
            message:'Chua cung cap token.'
        })
    }
})

ProtectedRoutes.get('/laythongtinnguoidung',(req,res)=>{
    let token = req.headers['access-token'];
    let decodetoken = jwt.decode(token);
    let user = decodetoken.user;
    var sql = `SELECT HoTen,Email,SDT,DiaChi from taikhoan WHERE MaTK='${user.MaTK}'`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

ProtectedRoutes.put('/capnhatnguoidung',(req,res)=>{
    let token = req.headers['access-token'];
    let decodetoken = jwt.decode(token);
    let user = decodetoken.user;
    const capNhatUser = req.body;
    var sql = `
                UPDATE taikhoan SET 
                HoTen='${capNhatUser.HoTen}',
                SDT='${capNhatUser.SDT}',
                DiaChi='${capNhatUser.DiaChi}'
                WHERE MaTK='${user.MaTK}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//Them binh luan san pham
ProtectedRoutes.post('/thembinhluan',(req,res)=>{
    let token = req.headers['access-token'];
    let decodetoken = jwt.decode(token);
    let user = decodetoken.user;
    const binhLuan = req.body;
    var sql = `
                INSERT INTO binhluan(MaTK,MaSP,NoiDung,ThoiGian,TrangThai)
                VALUES('${user.MaTK}','${binhLuan.MaSP}','${binhLuan.NoiDung}','${binhLuan.ThoiGian}',1)
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//Xoa binh luan san pham
ProtectedRoutes.post('/xoabinhluan/:maBinhLuan',(req,res)=>{
    var sql = `
                UPDATE binhluan SET TrangThai=0 WHERE MaBL='${req.params.maBinhLuan}'
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API lay danh sach cac binh luan theo ma san pham
app.get('/api/binhluan/layDanhSachBinhLuan/:maSanPham',(req,res)=>{
    var sql = `
              SELECT binhluan.MaBL,binhluan.MaTK,taikhoan.HoTen,binhluan.NoiDung,binhluan.ThoiGian,binhluan.TrangThai FROM binhluan,taikhoan
              WHERE binhluan.MaTK=taikhoan.MaTK AND binhluan.TrangThai=1 AND binhluan.MaSP='${req.params.maSanPham}' ORDER BY binhluan.MaBL ASC
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})



//API Dang Nhap

app.post('/api/dangnhap',(req,res)=>{
    let user = req.body;
    var sql = `SELECT MaTK,HoTen,Email,isAdmin from taikhoan WHERE Email='${user.Email}' AND MatKhau='${user.Password}' AND TrangThai=1`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        if(results.length!==0)
        {
            let user = results[0];
            const payload = {
                user:user
            }

            let token = jwt.sign(payload,config.secret,{expiresIn:1440})
            res.json({
                user:results,
                token:token
            })
        }
        else res.send({message:"tai khoan hoac mat khau khong khop !"})
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

//---------------------KHUYEN MAI---------------------------//
app.get('/api/khuyenmai',(req,res)=>{
    var sql = "SELECT * FROM chitiet_km";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//Api lay phan tram khuyen mai maSanPham
app.get('/api/khuyenmai/layPhanTramKM/:maSanPham',(req,res)=>{
    var sql = `SELECT PhanTram from chitiet_km WHERE chitiet_km.MaSP=${req.params.maSanPham} AND chitiet_km.TrangThai=1 `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API Them Dot Khuyen Mai Moi
app.post('/api/khuyenmai/themKhuyenMai',(req,res)=>{
    const khuyenMai = req.body;
    var sql = `
                INSERT INTO khuyenmai(MaKM,TenDotKM,NgayBD,NgayKT,TrangThai) 
                VALUES('${khuyenMai.MaKM}','${khuyenMai.TenDotKM}','${khuyenMai.NgayBD}','${khuyenMai.NgayKT}',1)
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay thong tin cac dot khuyen mai 
app.get('/api/khuyenmai/layDanhSachDotKM',(req,res)=>{
    var sql = "SELECT * from khuyenmai";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })

})

//API lay chi tiet khuyen mai theo ma chuong trinh khuyen mai
app.get('/api/khuyenmai/layChiTietKhuyenMai/:maKM',(req,res)=>{
    var sql = `SELECT chitiet_km.MaKM,chitiet_km.MaSP,sanpham.TenSP
               ,chitiet_km.PhanTram,chitiet_km.TrangThai From sanpham,chitiet_km 
               WHERE sanpham.MaSP=chitiet_km.MaSP AND chitiet_km.MaKM=${req.params.maKM}`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API update trang thai chi tiet khuyen mai = false theo ma san pham
app.put('/api/khuyenmai/capNhatChiTiet0/:maSanPham',(req,res)=>{
    var sql = `UPDATE chitiet_km SET TrangThai = 0 WHERE MaSP = ${req.params.maSanPham}`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API update trang thai chi tiet khuyen mai = true theo ma san pham
app.put('/api/khuyenmai/capNhatChiTiet1/:maSanPham',(req,res)=>{
    var sql = `UPDATE chitiet_km SET TrangThai = 1 WHERE MaSP = ${req.params.maSanPham}`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API lay ra danh sach san pham chua duoc khuyen mai
app.get('/api/khuyenmai/layDSSPChuaKM',(req,res)=>{
    var sql = "SELECT sanpham.MaSP,sanpham.TenSP FROM sanpham WHERE sanpham.MaSP NOT IN (SELECT MaSP from chitiet_km )";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})

//API them chi tiet khuyen mai moi theo dot khuyen mai
app.post('/api/khuyenmai/themCTKM/:maKM',(req,res)=>{
    let CTKM = req.body;
    var sql = `INSERT INTO chitiet_km(MaKM,MaSP,PhanTram,TrangThai) VALUES('${req.params.maKM}','${CTKM.MaSP}','${CTKM.PhanTram}',1)`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API cap nhat chi tiet khuyen mai theo ma khuyen mai
app.put('/api/khuyenmai/capNhatCTKM/:maKM',(req,res)=>{
    let sql = `UPDATE chitiet_km SET PhanTram='${req.body.PhanTram}' WHERE MaKM='${req.params.maKM}' AND MaSP='${req.body.MaSP}'`
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API xoa khuyen mai 
app.put('/api/khuyenmai/xoaKhuyenMai/:maKM',(req,res)=>{
    let sql = `UPDATE khuyenmai SET TrangThai=0 WHERE MaKM=${req.params.maKM}`
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API phuc hoi khuyen mai
app.put('/api/khuyenmai/phucHoiKhuyenMai/:maKM',(req,res)=>{
    let sql = `UPDATE khuyenmai SET TrangThai=1 WHERE MaKM=${req.params.maKM}`
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})


//---------------------HOADON---------------------------//

//API lay so luong hoa don hien co 

app.get('/api/hoadon/laySoLuongHoaDon',(req,res)=>{
    var sql = "SELECT COUNT(*) AS SOLUONG from hoadon"
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})

//API Them hoa hon
app.post('/api/hoadon/themHoaDon',(req,res)=>{
    let hoaDon = req.body;
    var sql = `
                INSERT INTO hoadon(MaHD,HoTen,Email,SDT,DiaChi,ThanhTien,TrangThai_TT,TrangThai_GH,TrangThai)
                VALUES('${hoaDon.MaHD}',
                '${hoaDon.HoTen}','${hoaDon.Email}',
                '${hoaDon.SDT}','${hoaDon.DiaChi}',
                '${hoaDon.ThanhTien}',0,0,0)`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API them chi tiet hoa don
app.post('/api/hoadon/themCTHD',(req,res)=>{
    let CTHD = req.body;
    var sql = `
                INSERT INTO chitiet_hd(MaHD,MaSP,SL,Gia)
                VALUES('${CTHD.MaHD}','${parseInt(CTHD.MaSP)}','${CTHD.SoLuong}','${CTHD.GiaCu}')
              `
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})




app.listen(port,()=>console.log(`App listening on port ${port}`));
