// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import "./login.css";
// import { NavLink, useNavigate } from "react-router-dom";
// import BackgroundImage from "../../assets/images/background.png";
// import Logo from "../../assets/images/logo.png";
// import axios from "axios";
// import Modal from "react-modal";
// const Login3 = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleLoginRequest = async (apiEndpoint, isAdmin) => {
//     try {
//       const response = await axios.post(apiEndpoint, formData);
//       console.log(response.data);

//       if (response.status === 200) {
//         handleLogin(formData, isAdmin);
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Đã có lỗi xảy ra", error);
//       setIsModalOpen(true);
//       setModalContent(
//         "Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!"
//       );
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isAdmin = document.getElementById("isAdmin").checked;

//     if (isAdmin) {
//       handleLoginRequest("http://localhost:3001/api/AdminLogin", true);
//     } else {
//       handleLoginRequest("http://localhost:3001/api/login", false);
//     }
//   };
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handlePassword = () => {};

//   const onClickregister = () => {
//     navigate("/Register");
//   };
//   return (
//     <div
//       className="sign-in__wrapper"
//       style={{ backgroundImage: `url(${BackgroundImage})` }}
//     >
//       {/* Overlay */}
//       <div className="sign-in__backdrop"></div>
//       {/* Form */}
//       <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
//         {/* Header */}
//         <img
//           className="img-thumbnail mx-auto d-block mb-2"
//           src={Logo}
//           alt="logo"
//         />
//         <div className="h4 mb-2 text-center">Sign In</div>
//         {/* ALert */}
//         {show ? (
//           <Alert
//             className="mb-2"
//             variant="danger"
//             onClose={() => setShow(false)}
//             dismissible
//           >
//             Incorrect username or password.
//           </Alert>
//         ) : (
//           <div />
//         )}
//         <Form.Group className="mb-2" controlId="username">
//           <Form.Label>Username</Form.Label>
//           <Form.Control
//             type="text"
//             value={inputUsername}
//             name="username"
//             placeholder="Username"
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-2" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             value={inputPassword}
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>
//         <Form.Group className="mb-2" controlId="checkbox">
//           <Form.Check type="checkbox" label="Remember me" />
//         </Form.Group>
//         {!loading ? (
//           <Button className="w-100" variant="primary" type="submit">
//             Log In
//           </Button>
//         ) : (
//           <Button className="w-100" variant="primary" type="submit" disabled>
//             Logging In...
//           </Button>
//         )}
//         <div className="d-grid justify-content-end">
//           <Button
//             className="text-muted px-0"
//             variant="link"
//             onClick={handlePassword}
//           >
//             Forgot password?
//           </Button>
//         </div>
//         <div className="d-grid justify-content-end">
//           <Button
//             className="text-muted px-0"
//             variant="link"
//             onClick={onClickregister}
//           >
//             Register
//           </Button>
//         </div>
//       </Form>
//       {/* Footer */}
//       <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
//         Made by Hendrik C | &copy;2022
//       </div>
//     </div>
//   );
// };

// export default Login3;
