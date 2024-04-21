DROP DATABASE Library;
CREATE DATABASE Library;
USE Library;
create table TaiKhoan(
MaSoTaiKhoan varchar(8) primary key, -- TK0001
TenTaiKhoan varchar(50) not null,
MatKhau varchar(50)  not null,
HoVaTen varchar(50)  not null,
NgaySinh date  not null,
VaiTro varchar(20)  not null,
DiaChi varchar(50)  not null,
SoDienThoai varchar(11)  not null
);
create table DocGia(
MaSoDocGia varchar(8) ,
primary key (MaSoDocGia),
FOREIGN KEY (MaSoDocGia) REFERENCES TaiKhoan(MaSoTaiKhoan)
);
create table NhaQuanLy(
MaSoNhaQuanLy varchar(8) ,
primary key (MaSoNhaQuanLy),
FOREIGN KEY (MaSoNhaQuanLy) REFERENCES TaiKhoan(MaSoTaiKhoan)
);
-----
create table DonMuonSach(
MaDonMuon varchar(8) primary key, -- DM0001
NgayTaoDon date not null,
NgayChapNhan date not null,
NgayTraSach date not null,
Gia DECIMAL(10,2) not null,
TinhTrangThanhToan varchar(20) not null,
MaSoDocGia varchar(8),
FOREIGN KEY (MaSoDocGia) REFERENCES DocGia(MaSoDocGia)
);
create table DanhMuc(
MaSoDanhMuc varchar(8) primary key,
Ten varchar(50) not null,
MoTa varchar(150) 
);
create table Sach(
MaSoSach varchar(8) primary key,
TenSach varchar(80) not null,
TacGia varchar(50) not null,
NhaPhatHanh varchar(80) not null,
SoLuong int not null,
SoLuongConLai INT ,
DanhMuc varchar(8) not null,
TrangThai ENUM('HoatDong', 'DaXoa') DEFAULT 'HoatDong',
Anh varchar(1000),
Mota varchar(2000),
FOREIGN KEY (DanhMuc) REFERENCES DanhMuc(MaSoDanhMuc)
);

create table SachMuon(
MaDonMuonSach varchar(8),
MaSoSach varchar(8),
SoLuong int not null,
primary key (MaDonMuonSach,MaSoSach),
FOREIGN KEY (MaDonMuonSach) REFERENCES DonMuonSach(MaDonMuon),
FOREIGN KEY (MaSoSach) REFERENCES Sach(MaSoSach)
);


create table QuanLySach(
MaSoNhaQuanLy varchar(8),
MaSoSach varchar(8),
primary key (MaSoNhaQuanLy,MaSoSach),
foreign key (MaSoNhaQuanLy) references NhaQuanLy(MaSoNhaQuanLy),
foreign key (MaSoSach) references Sach(MaSoSach)
);
create table NhanXet(
MaSoNhanXet varchar(8) primary key,
XepHang varchar(20) not null,
BinhLuan varchar(50),
Ngay date
);
create table DanhGia(
MaSoNhanXet varchar(8) primary key,
MaDocGia varchar(8),
MaSoSach varchar(8),
foreign key (MaSoNhanXet) references NhanXet(MaSoNhanXet),
foreign key (MaDocGia) references DocGia(MaSoDocGia),
foreign key (MaSoSach) references Sach(MaSoSach)
);

DELIMITER //
CREATE PROCEDURE InsertTaiKhoan
(
    IN p_TenTaiKhoan VARCHAR(255),
    IN p_MatKhau VARCHAR(255),
    IN p_HoVaTen VARCHAR(255),
    IN p_NgaySinh DATE,
    IN p_VaiTro VARCHAR(255),
    IN p_DiaChi VARCHAR(255),
    IN p_SoDienThoai VARCHAR(255)
)
BEGIN
    DECLARE nextID INT;
    DECLARE new_MaSoTaiKhoan VARCHAR(10);
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoTaiKhoan, 3, LENGTH(MaSoTaiKhoan) - 2) AS SIGNED)), 0) + 1
    INTO nextID
    FROM taikhoan;

    SET new_MaSoTaiKhoan = CONCAT('TK', LPAD(nextID, 3, '0'));

    INSERT INTO Taikhoan(MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro,DiaChi ,SoDienThoai)
    VALUES (new_MaSoTaiKhoan, p_TenTaiKhoan, p_MatKhau, p_HoVaTen, p_NgaySinh, p_VaiTro,p_DiaChi, p_SoDienThoai);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertSach
(
    IN p_TenSach VARCHAR(80),
    IN p_TacGia VARCHAR(50),
    IN p_NhaPhatHanh VARCHAR(80),
    IN p_SoLuong INT,
	IN p_TrangThai ENUM('HoatDong', 'DaXoa') ,
    IN p_TenDanhMuc VARCHAR(50),
	IN p_anh VARCHAR(1000),
    IN p_MoTa VARCHAR(2000)

) 
BEGIN
    DECLARE nextId INT;
    DECLARE new_masoSach VARCHAR(8);
    DECLARE masodanhmuc VARCHAR(8);

    SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoSach, 3, LENGTH(MaSoSach) - 2) AS SIGNED)), 0) + 1
    INTO nextId
    FROM Sach;
	IF p_TenDanhMuc = 'Kinh Te' THEN
    SET masodanhmuc = 'DM001';
ELSEIF p_TenDanhMuc = 'Khoa Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Tu Tuong' THEN
    SET masodanhmuc = 'DM007';
ELSEIF p_TenDanhMuc = 'Am Nhac' THEN
    SET masodanhmuc = 'DM008';
ELSEIF p_TenDanhMuc = 'Tieu Thuyet' THEN
    SET masodanhmuc = 'DM006';
ELSEIF p_TenDanhMuc = 'Van Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Lich Su' THEN
    SET masodanhmuc = 'DM003';
ELSEIF p_TenDanhMuc = 'Dia Ly' THEN
    SET masodanhmuc = 'DM004';
ELSEIF p_TenDanhMuc = 'Ngoai Ngu' THEN
    SET masodanhmuc = 'DM009';
END IF;
    SET new_masoSach = CONCAT('S', LPAD(nextId, 3, '0'));
	INSERT INTO Sach (MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, DanhMuc,TrangThai,Anh,MoTa)
	VALUES (new_masoSach, p_TenSach, p_TacGia, p_NhaPhatHanh, p_SoLuong, masodanhmuc,p_TrangThai,p_anh,p_MoTa);
END;
//

DELIMITER ;

DELIMITER //

-- ben BE tu dung query lay ma sach
CREATE PROCEDURE updateSach
(
	IN p_MaSoSach varchar(8),
    IN p_TenSach VARCHAR(80),
    IN p_TacGia VARCHAR(50),
    IN p_NhaPhatHanh VARCHAR(80),
    IN p_SoLuong INT,
	IN p_TrangThai ENUM('HoatDong', 'DaXoa') ,
    IN p_TenDanhMuc VARCHAR(50)
) 
BEGIN
    DECLARE masodanhmuc VARCHAR(8);
	IF p_TenDanhMuc = 'Kinh Te' THEN
    SET masodanhmuc = 'DM001';
ELSEIF p_TenDanhMuc = 'Khoa Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Tu Tuong' THEN
    SET masodanhmuc = 'DM007';
ELSEIF p_TenDanhMuc = 'Am Nhac' THEN
    SET masodanhmuc = 'DM008';
ELSEIF p_TenDanhMuc = 'Tieu Thuyet' THEN
    SET masodanhmuc = 'DM006';
ELSEIF p_TenDanhMuc = 'Van Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Lich Su' THEN
    SET masodanhmuc = 'DM003';
ELSEIF p_TenDanhMuc = 'Dia Ly' THEN
    SET masodanhmuc = 'DM004';
ELSEIF p_TenDanhMuc = 'Ngoai Ngu' THEN
    SET masodanhmuc = 'DM009';
END IF;

	UPDATE  Sach 
	SET MaSoSach=p_MaSoSach,TenSach= p_TenSach, TacGia=p_TacGia, NhaPhatHanh=p_NhaPhatHanh, SoLuong=p_SoLuong, DanhMuc= masodanhmuc,TrangThai=p_TrangThai
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deleteSach
(
	IN p_MaSoSach varchar(8)
) 
BEGIN
   UPDATE  Sach 
	SET TrangThai='DaXoa'
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;


-- CALL deleteSach('S001');

//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ThemSachVaoGioHang
(
	IN p_MaSoSach varchar(8)	
) 
BEGIN
    DELETE FROM Sach
    WHERE MaSoSach=p_MaSoSach; 
    UPDATE  Sach 
	SET TrangThai='DaXoa'
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;

delimiter //
create procedure insertNhanXet
( 
in p_xephang varchar(255),
in p_binhluan varchar(255),
in p_ngay date 
)
begin 
declare nextID int;
declare new_masonhanxet varchar(8);
SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoNhanXet, 3, LENGTH(MaSoNhanXet) - 2) AS SIGNED)), 0) + 1
INTO nextId
FROM NhanXet; 
set new_masonhanxet= concat('NX',LPAD(nextID,3,'0'));
insert into NhanXet(MaSoNhanXet ,XepHang,BinhLuan ,Ngay )
values(new_masonhanxet,p_xephang,p_binhluan,p_ngay);
end;
//
delimiter ;

delimiter //
create procedure updateNhanXet
( 
in p_masonhanxet varchar(8),
in p_xephang varchar(255),
in p_binhluan varchar(255),
in p_ngay date 
)
begin 
update  NhanXet 
set MaSoNhanXet=p_masonhanxet ,XepHang=p_xephang,BinhLuan=p_binhluan ,Ngay =p_ngay
where MaSoNhanXet=p_masonhanxet;
end;
//
delimiter ;

delimiter //
create procedure deleteNhanXet
( 
in p_masonhanxet varchar(8)
)
begin 
delete from nhanxet 
where masonhanxet=p_masonhanxet;
end;
//
delimiter ;
select * from nhanxet;
CALL deleteNhanXet('NX001');

delimiter //
create procedure listDonHangDaDat
(
)
begin
select * from donmuonsach 
where TinhTrangThanhToan = 'Thanh Cong';
end;
//
delimiter ;
DELIMITER //
CREATE FUNCTION SoLuongSachConLai (p_MaSoSach VARCHAR(8))
RETURNS INT 
READS SQL DATA
begin 
	declare totalamountleft INT;
    SELECT COALESCE(a.SoLuong - IFNULL(SUM(b.SoLuong), 0), a.SoLuong) INTO totalamountleft
    from sach as a
    join sachmuon as b on a.MaSoSach=b.MaSoSach
    join donmuonsach as c on b.MaDonMuonSach = c.MaDonMuon
    where c.TinhTrangThanhToan= 'Thanh Cong' and a.MaSoSach=p_MaSoSach 
    group by a.MaSoSach ;
    return totalamountleft;
end;
//
 DELIMITER ;
-- được kích hoạt khi insert 1 cuốn sách mới
DELIMITER //
CREATE TRIGGER updatesoluongSachConLai_wheninsertSachMoi
BEFORE INSERT on sach
FOR EACH ROW
BEGIN
    SET NEW.SoLuongConLai = NEW.SoLuong;
END;
//
DELIMITER ;
drop TRIGGER updatesoluongSach
drop TRIGGER updatesoluongSach_saukhiupdatesoluongcungcap
DELIMITER //
CREATE TRIGGER updatesoluongSach_saukhiupdatesoluongcungcap
BEFORE update on sach
FOR EACH ROW
BEGIN
	SET NEW.SoLuongConLai = IFNULL(SoLuongSachConLai(NEW.MaSoSach), NEW.SoLuong);
END;
//
DELIMITER ;

-- được kích hoạt khi mỗi lần có 1 row sách mượn được insert vào.
DELIMITER //
CREATE TRIGGER updateSoLuongConLai
BEFORE INSERT ON sachmuon
FOR EACH ROW
BEGIN
    UPDATE sach
    SET SoLuongConLai = SoLuongSachConLai(NEW.MaSoSach)
    WHERE MaSoSach = NEW.MaSoSach;
END;
//
DELIMITER ;




-- INSERT
-- 
INSERT INTO TaiKhoan (MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai)
VALUES
('TK0001', 'user1', 'password1', 'John Doe', '1990-01-01', 'User', '123 Main St, City', '1234567890');

INSERT INTO DocGia (MaSoDocGia)
VALUES ('TK0001');
INSERT INTO DanhMuc(MaSoDanhMuc, Ten, MoTa)
VALUES 
('DM001', 'Kinh Te', 'Sach ve kinh te'),
('DM002', 'Van Hoc', 'Sach ve van hoc'),
('DM003', 'Lich Su', 'Sach ve lich su'),
('DM004', 'Dia Ly', 'Sach ve dia ly'),
('DM005', 'Khoa Hoc', 'Sach ve khoa hoc'),
('DM006', 'Tieu Thuyet', 'Sach tieu thuyet'),
('DM007', 'Tu Tuong', 'Sach ve tu tuong'),
('DM008', 'Am Nhac', 'Sach ve am nhac'),
('DM009', 'Ngoai Ngu', 'Sach ve ngoai ngu');

CALL insertSach('NO VACAB - NO WORRIES','Vu Hai','Nha Xuat Ban Dai Hoc Kinh Te Quoc Dan',10,'HoatDong','Ngoai Ngu','https://salt.tikicdn.com/cache/w1200/ts/product/a9/61/a8/16ac9af340421f04af8c7420c4ef0b25.jpg','Cuon IELTS No Vocab No Worries se giup ban “hoa giai” nhung tro ngai tren con duong chinh phuc dinh cao IELTs. Cuon sach duoc in mau voi nhung hinh minh hoa sinh dong, de cap den nhieu chu de khac nhau trong cac de thi thuc cua IELTs giup thi sinh nang cao von tu vung can thiet va loi tu duy de nay ra y tuong va ung bien voi moi truong hop, moi cau hoi. Nhung meo nho cung duoc tac gia chon loc va trinh bay ngan gon, de hieu. Day qua la mot cuon sach thiet thuc ma bat cu ai tren hanh trinh chinh phuc tam chung chi IELTS cung nen so huu cho minh mot cuon.');
CALL insertSach('Giai thich ngu phap tieng Anh','Mai Lan Huong','Nha Xuat Ban Da Nang',20,'HoatDong','Ngoai Ngu', 'https://cdn0.fahasa.com/media/catalog/product/z/3/z3097453775918_7ea22457f168a4de92d0ba8178a2257b.jpg','Ngu phap Tieng Anh tong hop cac chu diem ngu phap trongg yeu ma hoc sinh can nam vung. Cac chu diem ngu phap duoc trinh bay ro rang, chi tiet. Sau moi chu diem ngu phap la phan bai tap & dap an nham giup cac em cung co kien thuc da hoc, dong thoi tu kiem tra ket qua.');
CALL insertSach('Cam nang cau truc tieng anh','Trang Anh','Nha Xuat Ban Dai Hoc Su Pham',15,'HoatDong','Ngoai Ngu', 'https://salt.tikicdn.com/cache/w1200/ts/product/b2/c7/b2/617e1165b21f498aea14cfd110bd5f10.jpg','Cuon sach Cam Nang Cau Truc Tieng Anh gom 25 phan, moi phan la mot pham tru kien thuc trong tieng Anh duoc trinh bay mot cach ngan gon, don gian, co dong va he thong hoa duoi dang so do, bang bieu nham phat trien kha nang tu duy cua nguoi hoc va tu do giup nguoi hoc nho kien thuc nhanh hon va sau hon. Sau hau het cac phan li thuyet deu co 20-30 cau bai tap ap dung de kiem tra cung nhu khac sau kien thuc cho nguoi hoc. Tuy day chua den 250 trang nhung cuon sach lai co the bao tron toan bo kien thuc tu don gian den phuc tap cong voi cach tan dung toi da va ap dung triet de cach hoc tieng Anh bang so do tu duy.');

INSERT INTO DonMuonSach (MaDonMuon, NgayTaoDon, NgayChapNhan, NgayTraSach, Gia, TinhTrangThanhToan, MaSoDocGia)
VALUES
('DH004', '2024-02-01', '2024-02-02', '2024-02-10', 50.00, 'Thanh Cong', 'TK0001');

INSERT INTO SachMuon (MaDonMuonSach, MaSoSach, SoLuong)
VALUES
('DH004', 'S001', 5);

SELECT * FROM Sach;
