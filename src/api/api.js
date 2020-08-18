
const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
let config = require('./config');
const { response } = require('express');
const port = 5006;

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

//API lay thong tin nguoi dung
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

//API cap nhat thong tin cua nguoi dung
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

//API cap nhat mat khau user 
ProtectedRoutes.put('/capnhatmatkhau',(req,res)=>{
    let token = req.headers['access-token'];
    let decodetoken = jwt.decode(token);
    let user = decodetoken.user;
    const password = req.body;

    var sql = `SELECT * from taikhoan WHERE MaTK='${user.MaTK}' AND MatKhau='${password.MatKhauCu}'`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        if(results.length===0)
        {
            res.json({
                messageError:"Mật khẩu cũ không đúng !"
            })
        }
        else
        {
            var sql = `SELECT * FROM taikhoan WHERE MatKhau='${password.MatKhauMoi1}'
            AND MaTK='${user.MaTK}'`
            connection.query(sql,(err,results)=>{
                if(err) throw err;
                if(results.length>0)
                {
                    res.json({messageWarrning:'Bạn đã nhập mật khẩu cũ ! Vui lòng nhập mật khẩu mới !'})
                }
                else {
                    var sql = `
                        UPDATE taikhoan SET 
                        MatKhau='${password.MatKhauMoi1}'
                        WHERE MaTK='${user.MaTK}'
                    `;
                    connection.query(sql,(err,results)=>{
                        if(err) throw err;
                        res.json({
                            messageSuccess:'Cập nhật mật khẩu thành công !'
                        });
                    })
                }
            })
        }
    })



    
})

//Them binh luan san pham
ProtectedRoutes.post('/thembinhluan',(req,res)=>{
    let token = req.headers['access-token'];
    let decodetoken = jwt.decode(token);
    let user = decodetoken.user;
    const trangThai = user.MaTK==='TK0'?1:0;
    const binhLuan = req.body;
    var sql = `
                INSERT INTO binhluan(MaTK,MaSP,NoiDung,ThoiGian,TrangThai)
                VALUES('${user.MaTK}','${binhLuan.MaSP}','${binhLuan.NoiDung}','${binhLuan.ThoiGian}','${trangThai}')
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})


//API them chi tiet binh luan
ProtectedRoutes.post('/themchitietbinhluan',(req,res)=>{
    let token = req.headers['access-token'];
    let decodetoken = jwt.decode(token);
    let user = decodetoken.user;
    const trangThai=user.MaTK==='TK0'?1:0;
    const binhLuan = req.body;
    var sql = `
                INSERT INTO chitiet_bl(MaBL,MaTK,NoiDung,ThoiGian,TrangThai)
                VALUES('${binhLuan.MaBL}','${user.MaTK}','${binhLuan.NoiDung}','${binhLuan.ThoiGian}','${trangThai}')
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

//Xoa chi tiet binh luan san pham
ProtectedRoutes.post('/xoachitietbinhluan/:maCTBL',(req,res)=>{
    var sql = `
                UPDATE chitiet_bl SET TrangThai=0 WHERE MaCTBL='${req.params.maCTBL}'
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
              WHERE binhluan.MaTK=taikhoan.MaTK AND binhluan.TrangThai=1 AND binhluan.MaSP='${req.params.maSanPham}' ORDER BY binhluan.MaBL DESC
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay chi tiet binh luan theo ma binh luan 
app.get('/api/binhluan/layDanhSachCTBinhLuan/:maBinhLuan',(req,res)=>{
    var sql = `
                SELECT chitiet_bl.MaCTBL,chitiet_bl.MaBL,chitiet_bl.MaTK,
                chitiet_bl.NoiDung,chitiet_bl.ThoiGian,taikhoan.HoTen 
                FROM chitiet_bl,taikhoan WHERE chitiet_bl.MaBL=${req.params.maBinhLuan}
                AND chitiet_bl.TrangThai=1 AND chitiet_bl.MaTK=taikhoan.MaTK
                ORDER BY chitiet_bl.MaCTBL DESC
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}) 

//API lay danh sach cac binh luan theo ngay hien tai
app.get('/api/binhluan/layDanhSachBinhLuanTheoNgay',(req,res)=>{
    var sql = `
    SELECT binhluan.MaBL,binhluan.MaTK,binhluan.MaSP,taikhoan.HoTen,
    binhluan.NoiDung,binhluan.ThoiGian,binhluan.TrangThai 
    FROM binhluan,taikhoan,sanpham 
    WHERE binhluan.MaSP=sanpham.MaSP 
    AND binhluan.MaTK=taikhoan.MaTK AND binhluan.TrangThai=1 
    AND binhluan.ThoiGian >= CURRENT_DATE AND binhluan.ThoiGian < NOW() 
    ORDER BY binhluan.MaBL DESC
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay danh sach binh luan co trang thai = 0
app.get('/api/binhluan/layDSBL0',(req,res)=>{
    var sql = `
    SELECT * FROM binhluan WHERE binhluan.TrangThai=0
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API duyet binh luan theo ma binh luan 
app.put('/api/binhluan/duyetBinhLuan/:MaBL',(req,res)=>{
    var sql = `
        UPDATE binhluan SET TrangThai=1 WHERE MaBL='${req.params.MaBL}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json({
            messageSuccess:'Đã duyệt bình luận !'
        })
    })
})

//API lay danh sach phan hoi co trang thai = 0
app.get('/api/binhluan/layDanhSachPhanHoi',(req,res)=>{
    var sql = `
    SELECT * FROM chitiet_bl WHERE TrangThai=0
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API duyet phan hoi theo ma chi tiet binh luan
app.put('/api/binhluan/duyetPhanHoi/:MaCTBL',(req,res)=>{
    var sql = `
        UPDATE chitiet_bl SET TrangThai=1 WHERE MaCTBL='${req.params.MaCTBL}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json({
            messageSuccess:'Đã duyệt phản hồi !'
        })
    })
})

//API Dang Nhap
app.post('/api/dangnhap',(req,res)=>{
    let user = req.body;
    var sql = `SELECT MaTK,HoTen,Email,SDT,DiaChi,isAdmin from taikhoan WHERE Email='${user.Email}' AND MatKhau='${user.Password}' AND TrangThai=1`;
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

//API dang ky tai khoan 
app.post('/api/dangkytaikhoan',(req,res)=>{
    let taiKhoan = req.body;
    var sql = `SELECT * FROM taikhoan WHERE taikhoan.Email ='${taiKhoan.Email}'`;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        if(results.length===1){
            res.json({
                message:"Email này đã tồn tại !"
            })
        }
        else{
            var sql = "SELECT COUNT(MaTK) AS SOLUONG from taikhoan";
            connection.query(sql,(err,results)=>{
                if(err) throw err;
                let MaTK = `TK${results[0].SOLUONG}`;
                let user = {MaTK:MaTK,...taiKhoan};
                var sql = `
                INSERT INTO taikhoan(MaTK,HoTen,Email,SDT,MatKhau,isAdmin,TrangThai)
                VALUES('${user.MaTK}','${user.HoTen}','${user.Email}','${user.SDT}','${user.MatKhau}',0,1)
                `;
                connection.query(sql,(err,results)=>{
                    if(err) throw err;
                    res.json({
                        message:"Đăng kí thành công !"
                    });
                })
            })
        }
    })
})

//API xac nhan nguoi dung thay doi mat khau
app.get('/api/taikhoan/layMatKhau/:email',(req,res)=>{
    var sql = `
        SELECT * FROM taikhoan WHERE taikhoan.Email='${req.params.email}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        if(results.length===0)
        {
            res.json({
                messageErr:"Email bạn vừa nhập không tồn tại !"
            })
        }
        else {
            res.json({
                MaTK:results[0].MaTK
            })
        }
    })
})


//API lay danh sach san pham
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

//API them anh san pham dua theo ma san pham
app.post('/api/sanpham/themAnhSP',(req,res)=>{
    let anhSP=req.body;
    var sql = `
              INSERT INTO anhsp_lq(MaSP,HinhAnh)
              VALUES('${anhSP.MaSP}','${anhSP.HinhAnh}')
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json({
            message:"Thêm ảnh thành công !"
        })
    })
})

//API xoa anh san pham lien quan
app.delete('/api/sanpham/xoaAnhSP/:ID',(req,res)=>{
    var sql = `
              DELETE from anhsp_lq WHERE ID='${req.params.ID}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json({
            message:"Xóa ảnh thành công !"
        })
    })
})

//API lay danh sach hinh anh SP theo ma san pham 
app.get('/api/sanpham/layDanhSachAnh/:MaSP',(req,res)=>{
    var sql = `SELECT * FROM anhsp_lq WHERE MaSP='${req.params.MaSP}'`
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API xem chi tiet san pham
app.get('/api/sanpham/xemChiTietSP/:id',(req,res)=>{
    let maSanPham = req.params.id;
    let sql = `
    SELECT chitiet_km.PhanTram 
    from chitiet_km,sanpham,khuyenmai 
    WHERE sanpham.MaSP=chitiet_km.MaSP
    AND khuyenmai.MaKM=chitiet_km.MaKM 
    AND chitiet_km.TrangThai = 1 
    AND khuyenmai.TrangThai = 1
    AND NOW() BETWEEN khuyenmai.NgayBD AND khuyenmai.NgayKT
    AND sanpham.MaSP = '${maSanPham}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        if(results.length===0)
        {
            var sql = `
                SELECT sanpham.MaSP, sanpham.MaDM,
                    sanpham.MaHang, chitiet_sp.MaKT,
                    chitiet_sp.SL, sanpham.TenSP,
                    sanpham.LuotBan, sanpham.LuotXem,
                    sanpham.Gia, sanpham.SanPham_Moi,
                    sanpham.ThongTinSP, sanpham.TrangThai,
                    sanpham.Hinh FROM sanpham,chitiet_sp
                WHERE  sanpham.MaSP=chitiet_sp.MaSP AND sanpham.MaSP='${maSanPham}'`;
            connection.query(sql,(err,results)=>{
                    if(err) throw err;
                    res.json(results);
            })
        }
        else
        {
            let phanTram=results[0].PhanTram;
            var sql = `
                SELECT sanpham.MaSP, sanpham.MaDM,
                    sanpham.MaHang, chitiet_sp.MaKT,
                    chitiet_sp.SL, sanpham.TenSP,
                    sanpham.LuotBan, sanpham.LuotXem,
                    sanpham.Gia, sanpham.SanPham_Moi,
                    sanpham.ThongTinSP, sanpham.TrangThai,
                    sanpham.Hinh FROM sanpham,chitiet_sp
                WHERE  sanpham.MaSP=chitiet_sp.MaSP AND sanpham.MaSP='${maSanPham}'`;
            connection.query(sql,(err,results)=>{
                    if(err) throw err;
                    results[0]={...results[0],PhanTram:phanTram}
                    res.json(results);
            })
        }
    }) 
})

//API lay kich thuoc san pham theo ma 
app.get('/api/sanpham/layKichThuocSanPham/:masp',(req,res)=>{
    var sql = `
            SELECT chitiet_sp.MaSP,chitiet_sp.MaKT,kichthuoc.TenKT 
            FROM kichthuoc,chitiet_sp WHERE chitiet_sp.MaSP='${req.params.masp}' 
            AND kichthuoc.MaKT=chitiet_sp.MaKT
            `;
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
            + "INTO sanpham(MaSP,MaDM,MaHang,TenSP,LuotBan,LuotXem,Gia,SanPham_Moi,ThongTinSP,TrangThai,Hinh)"
            + "VALUES('"
            + req.body.MaSP + "','"
            + req.body.MaDM + "','"
            + req.body.MaHang + "','"
            + req.body.TenSP + "','"
            + req.body.LuotBan + "','"
            + req.body.LuotXem +"','"
            + req.body.Gia + "','"
            + req.body.SanPham_Moi + "','"
            + req.body.ThongTinSP + "','"
            + req.body.TrangThai + "','"
            + req.body.Hinh + "')";
  
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })

})

//API them chi tiet san pham
app.post('/api/sanpham/themCTSP',(req,res)=>{
    const sanPham = req.body;
    var sql = `INSERT chitiet_sp(MaSP,MaKT,MaMau,SL)
               VALUES('${sanPham.MaSP}','${sanPham.MaKT}',9,'${sanPham.SL}')
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay danh sach cac kich thuoc 
app.get('/api/kichthuoc/layDSKT',(req,res)=>{
    var sql = "SELECT * FROM kichthuoc";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay danh sach hang san xuat 
app.get('/api/hangsx/layDSHangsx',(req,res)=>{
    var sql = "SELECT * FROM hangsx";
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


//--------------------------------------KHUYEN MAI-------------------------------------//

//API lay ma san pham trong dot khuyen mai voi phan tram khuyen mai theo ngay
app.get('/api/khuyenmai/laydssanphamKM',(req,res)=>{
    var sql = `
                SELECT sanpham.MaSP,sanpham.TenSP,khuyenmai.MaKM,chitiet_km.PhanTram 
                FROM khuyenmai,sanpham,chitiet_km WHERE sanpham.MaSP=chitiet_km.MaSP 
                AND khuyenmai.MaKM=chitiet_km.MaKM 
                AND khuyenmai.TrangThai=1 AND chitiet_km.TrangThai=1 
                AND NOW() BETWEEN khuyenmai.NgayBD AND khuyenmai.NgayKT
              `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})



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
app.get('/api/khuyenmai/layDSSPChuaKM/:MaKM',(req,res)=>{
    var sql = `
    select MaSP,TenSP from sanpham
     where MaSP not in 
     (select MaSP from khuyenmai as km1,(select ct.MaKM,MaSP,NgayBD,NgayKT 
        from khuyenmai as km2,chitiet_km as ct where km2.MaKM =ct.MaKM) 
        as tmp where km1.NgayBD between tmp.NgayBD AND tmp.NgayKT AND km1.MaKM='${req.params.MaKM}')`;
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
    var sql = hoaDon.MaTK!==""?`
                INSERT INTO hoadon(MaHD,MaTK,HoTen,Email,SDT,DiaChi,ThanhTien,PhuongThucTT,TrangThai_TT,TrangThai_GH,TrangThai)
                VALUES('${hoaDon.MaHD}','${hoaDon.MaTK}',
                '${hoaDon.HoTen}','${hoaDon.Email}',
                '${hoaDon.SDT}','${hoaDon.DiaChi}',
                '${hoaDon.ThanhTien}','${hoaDon.PhuongThucTT}',0,0,1)`
                :`
                INSERT INTO hoadon(MaHD,HoTen,Email,SDT,DiaChi,ThanhTien,PhuongThucTT,TrangThai_TT,TrangThai_GH,TrangThai)
                VALUES('${hoaDon.MaHD}',
                '${hoaDon.HoTen}','${hoaDon.Email}',
                '${hoaDon.SDT}','${hoaDon.DiaChi}',
                '${hoaDon.ThanhTien}','${hoaDon.PhuongThucTT}',0,0,1)`


    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API them chi tiet hoa don
app.post('/api/hoadon/themCTHD',(req,res)=>{
    let CTHD = req.body;
    var sql = `
                INSERT INTO chitiet_hd(MaHD,MaSP,MaKT,MaMau,SL,Gia)
                VALUES('${CTHD.MaHD}','${parseInt(CTHD.MaSP)}', '${CTHD.kichThuoc}', 9 , '${CTHD.SoLuong}','${CTHD.GiaCu}')
              `
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

app.get('/api/chitietHD/layDDCTHD/:MaHD',(req,res)=>{
    var sql = `
        SELECT chitiet_hd.MaHD,sanpham.TenSP,kichthuoc.TenKT,chitiet_hd.SL,
        chitiet_hd.Gia from chitiet_hd,sanpham,kichthuoc 
        WHERE sanpham.MaSP=chitiet_hd.MaSP AND kichthuoc.MaKT=chitiet_hd.MaKT 
        AND chitiet_hd.MaHD='${req.params.MaHD}'
    `;
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})


//HOADON
//API cap nhat trang thai cho san pham

//API lay danh sach hoa don sap xep theo ngay lap
app.get('/api/hoadon',(req,res)=>{
    var sql="SELECT * from hoadon order by NgayLapHD";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results)
    })
})
app.put('/api/hoadon/capnhatHD/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai='"
            + 0 +"'"
            + "WHERE MaHD='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
//API cap nhat trang thái thanh toan

app.put('/api/hoadon/capnhatTTThanhtoan1/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai_TT='"
            + 1 +"'"
            + "WHERE MaHD='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
app.put('/api/hoadon/capnhatTTThanhtoan0/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai_TT='"
            + 0+"'"
            + "WHERE MaHD='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
app.put('/api/hoadon/phuchoihoadon/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai='" + 1 + "'"
            + "WHERE MaHD='" + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if (err) throw err;
        res.json(results);
    })
})
app.put('/api/hoadon/capnhatTTGiaoHang1/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai_GH='"
            + 1+"'"
            + "WHERE MaHD='"
            + req.params.id + "'";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
app.put('/api/hoadon/capnhatTTGiaoHang2/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai_GH='"
            + 2+"'"
            + "WHERE MaHD='"
            + req.params.id + "'";
    
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})
app.put('/api/hoadon/capnhatTTGiaoHang3/:id',(req,res)=>{
    var sql = "UPDATE hoadon SET TrangThai_GH='"
            + 2+"'"
            + ","
            + "TrangThai_TT='"
            + 1+"'"
            + "WHERE MaHD='"
            + req.params.id + "'";
    
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API thong ke

//API lay so luong nguoi dang ky tai khoan 
app.get('/api/thongke/luotdangky',(req,res)=>{
    var sql = "SELECT COUNT(MaTK) AS SOLUONG FROM taikhoan WHERE isAdmin=0";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay tong so luong hoa don
app.get('/api/thongke/soluongHD',(req,res)=>{
    var sql = "SELECT COUNT(MaHD) AS SOLUONG FROM hoadon";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay so luong hoa don chua thanh toan
app.get('/api/thongke/soluongHD1',(req,res)=>{
    var sql = "SELECT COUNT(MaHD) AS SOLUONG FROM hoadon WHERE TrangThai_TT=0";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay so luong hoa don da thanh toan
app.get('/api/thongke/soluongHD2',(req,res)=>{
    var sql = "SELECT COUNT(MaHD) AS SOLUONG FROM hoadon WHERE TrangThai_TT=1";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})

//API lay so tong so luot binh luan san pham
app.get('/api/thongke/soluongBL',(req,res)=>{
    var sql = "SELECT COUNT(MaBL) AS SOLUONG FROM binhluan";
    connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
})



app.listen(port,()=>console.log(`App listening on port ${port}`));
