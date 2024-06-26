const db = require("../loaders/db");

exports.signupAdmin = (username, password, hovaten, callback) => {
  console.log("add");
  const sql =
    "CALL InsertTaiKhoan(?, ?, ?,'2000-01-01','Admin','DAI HỌC BK TPHCM','09999999999')";
  db.query(sql, [username, password, hovaten], callback);
};

exports.loginAdmin = (username, password, callback) => {
  const sql =
    "SELECT * FROM taikhoan,Nhaquanly WHERE TenTaiKhoan = ? AND MatKhau = ? and taikhoan.MaSoTaiKhoan=nhaquanly.MaSoNhaQuanLy";
  db.query(sql, [username, password], callback);
};

module.exports = exports;
