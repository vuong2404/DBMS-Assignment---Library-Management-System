import React, { useState } from "react";
import "./OurFood.css";
import { MyContext } from "./Context/CounterContext";

const OurFood = ({
  MaSoSach,
  NhaPhatHanh,
  SoLuong,
  SoLuongConLai,
  DanhMuc,
  TrangThai,
  Mota,
  Anh,
  TacGia,
  TenSach,
}) => {
  const { handleIncrease } = MyContext();
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <>
      <div className="row">
        <div
          className="col-lg-3 my-2 d-flex justify-content-center align-items-center ourfood"
          // style={{ marginRight: "10px" }}
        >
          <img src={Anh} className="ourImg" alt="Food" />
        </div>

        <div
          className="col-lg-3 my-2 d-flex justify-content-center align-items-center"
          style={{ marginRight: "100px" }}
        >
          <div
            className="col-lg-12 d-flex justify-content-center flex-column align-items-left"
            style={{ maxWidth: "400px" }}
          >
            <h4 className="text-bold" style={{ maxWidth: "400px" }}>
              {TenSach}
            </h4>
            <h4
              className="text-bold"
              style={{ fontSize: "16px", fontStyle: "italic" }}
            >
              Tác giả: {TacGia}
            </h4>
            <h4
              className="text-bold"
              style={{ fontSize: "14px", fontStyle: "italic" }}
            >
              Số lượng: {SoLuong}
            </h4>
            <div className="button-group">
              <button className="btn btn-dark mr-1" onClick={handleIncrease}>
                Add to cart
              </button>
              <button className="btn btn-info ml-1" onClick={toggleDetail}>
                Detail
              </button>
            </div>
          </div>
        </div>

        {showDetail && (
          <div className="col-lg-3 my-2">
            <div className="col-lg-12">
              <h4
                className="text-bold text-primary text-center text-nowrap"
                style={{ fontSize: "18px", fontStyle: "italic" }}
              >
                Mã số sách: {MaSoSach}
              </h4>

              <h4
                className="text-bold text-nowrap"
                style={{ fontSize: "18px", fontStyle: "italic" }}
              >
                Nhà phát hành: {NhaPhatHanh}
              </h4>
              <h4
                className="text-bold text-nowrap"
                style={{ fontSize: "18px", fontStyle: "italic" }}
              >
                Tác giả: {TacGia}
              </h4>
              <h4
                className="text-bold text-nowrap"
                style={{ fontSize: "18px", fontStyle: "italic" }}
              >
                Số lượng còn lại: {SoLuongConLai}
              </h4>

              {/* <h4
              className=" text-nowrap"
              style={{ fontSize: "18px", fontStyle: "italic" }}
            >
              Trạng thái:
              <span className="detail_mota_font">{TrangThai}</span>
            </h4> */}
              <h4 className="outbook_detail_mota" style={{ fontSize: "18px" }}>
                <span style={{ fontStyle: "italic" }}>Mô tả:</span>{" "}
                <span className="detail_mota_font">{Mota}</span>
              </h4>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OurFood;
