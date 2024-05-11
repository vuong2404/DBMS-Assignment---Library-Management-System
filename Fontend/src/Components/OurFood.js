import React, { useState } from "react";
import "./OurFood.css";
import { MyContext } from "./Context/CounterContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Space } from "antd";
import { toast } from "react-toastify";

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
  // const { handleIncrease } = MyContext();
  const [showDetail, setShowDetail] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {handleIncrease} = MyContext()

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const  handleAddtoCart = async (MaSoSach) => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)
    if (!userData) {
      navigate("/login")
      return ;
    }

    setLoading(true)
    try {
      const userId = userData.id
      const result = await axios({
        method: "POST", 
        url: `http://localhost:3001/api/users/${userId}/carts`,
        data: {MaSoSach}
      })

      if (result.status === 200) {
        const new_total_cart_items = result.data.total_cart_items
        handleIncrease(new_total_cart_items)
        toast.success("Thêm sách vào giỏ hàng thành công")
      }
      console.log(result)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

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
            <Space>
              <Button type="primary" onClick={() => handleAddtoCart(MaSoSach)}>
                Thêm vào giỏ hàng
              </Button>
              <Button  onClick={toggleDetail}>
               {!showDetail ? "Xem chi tiết": "Ẩn chi tiết"}
              </Button>
            </Space>
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
