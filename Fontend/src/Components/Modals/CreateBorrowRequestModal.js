import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CreateBorrowRequestModal = ({ listBook, ...props }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const modalStyles = {
        header: {
            borderRadius: 0,
            borderBottom: "1px solid #ccc",
            paddingBottom: 4,
            marginBottom: 24
        },
        body: {
            borderRadius: 5,
        },
        footer: {
            borderTop: '1px solid #ccc',
            paddingTop: 16
        },
        content: {
            padding: 20
        },
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true)
        try {
            await props.onConfirm()
            setLoading(false)
            setOpen(false);
        } catch (error) {
            console.log(error)
            setLoading(false)

            toast.error("Đã xảy ra lỗi!")
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleShowModal = () => {
        const form = props.form 
        const date = props.NgayTra

        if (!date) {
            form.setFields([{name: "NgayTraSach", errors: ["Vui lòng chọn ngày trả sách"]}])
            return ;
        } else if (new Date(date) <= new Date()) {
            form.setFields([{name: "NgayTraSach", errors: ["Ngày không hợp lệ"]}])
        } else {
            form.setFields([{name: "NgayTraSach", errors: []}])
            showModal()
        }
    }


    let soNgayMuon = 0
    let cost = 0 
    if (props.NgayTra) {
        soNgayMuon = Math.ceil((new Date(props.NgayTra).getTime() - new Date().getTime())/(1000*3600*24))
        cost = Math.floor(soNgayMuon *  props.total * 1000 )
    }


    return (
        <>
            <Button type="primary" onClick={handleShowModal}>Yêu cầu mượn Sách</Button>
            <Modal
                style={{ ...modalStyles }}
                destroyOnClose={true}
                title="Thông tin yêu cầu mượn sách"
                open={open}
                onOk={handleOk}
                okType="primary"
                okButtonProps={{ className: "bg-primary" }}
                cancelText="Cancel"
                onCancel={handleCancel}
                // footer={null}
                width={800}
                maskClosable={false}
            >
                <div className='container my-4'>
                    <div className="row border">
                        <div className="col-6">
                            <p>Tên Sách</p>
                        </div>

                        <div className="col-6">
                            <p>Số Lượng</p>
                        </div>
                    </div>
                    {
                        listBook.map((item, index) => (
                            <div className="row border">
                                <div className="col-6">
                                    <p>{item.TenSach}</p>
                                </div>

                                <div className="col-6">
                                    <p>{item.SoLuong}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="d-flex flex-wrap">
                    <div className="w-50">
                        <span className="me-3">Tổng số lượng: </span>
                        <b>{props.total}</b> 
                    </div>

                    <div className="w-50">
                        <span className="me-3">Ngày trả: </span>                        
                        {props.NgayTra && <b>{moment(props.NgayTra).format("YYYY-MM-DD")}</b>}
                    </div>

                    <div className="w-50">
                        <span className="me-3">Số ngày mượn: </span>                        
                        <b>{soNgayMuon}</b>
                    </div>

                    <div className="w-50">
                        <span>Phí: </span>
                        <b>{new Intl.NumberFormat().format(cost)} Vnđ</b>
                    </div>
                   
                    <div className="mt-3">
                        <Form.Item name="isAgree" labelAlign="right" label="Đồng ý với điều khoản và chính sách dịch vụ của thư viện">
                            <Checkbox/>
                            {/* <span className="ms-3">Đồng ý với điều khoản và chính sách dịch vụ của thư viện</span> */}
                        </Form.Item>
                    </div>
                </div>

            </Modal>
        </>)
}