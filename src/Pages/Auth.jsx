import React, { useContext, useState } from "react";
import authImg from "../assets/Images/auth.png";
import { Link, useNavigate } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../Services/allAPI";
import { tokenAuthenticationContext } from "../Context API/TokenAuth";

function Auth({ insideRegister }) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.error("Complete the form");
    } else {
      try {
        const result = await registerAPI(userData);
        // console.log(result);
        if (result.status === 200) {
          toast.success(
            `${result.data.username} has successfully registered!!`
          );
          setUserData({
            username: "",
            email: "",
            password: "",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.warning(`${result.response.data}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.error("Complete the form");
    } else {
      try {
        const result = await loginAPI(userData);
        if (result.status === 200) {
          setLoginStatus(true);
          sessionStorage.setItem("username", result.data.existingUser.username);
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
          setIsAuthorised(true)
          setTimeout(() => {
            setUserData({ email: "", password: "" });
            navigate("/");
            setLoginStatus(false);
          }, 2000);
        } else {
          toast.warning(`${result.response.data}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div
        style={{ width: "100%", height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container w-75">
          <Link to={"/home"}>
            {" "}
            <i className="fa-solid fa-arrow-left me-2"> Back to Home</i>
          </Link>
          <div
            style={{ backgroundColor: "#a274c4" }}
            className="card shadow p-5"
          >
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img className="w-100" src={authImg} alt="" />
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-column">
                  <h1 className="fw-bolder text-white mt-2">
                    {" "}
                    <i className="fa-solid fa-code"></i>Project Fair
                  </h1>
                  <h5 className="fw-bolder text-white mt-2 pb-3">
                    {insideRegister
                      ? "Sign Up to your Account"
                      : "Sign In to your Account"}
                  </h5>
                  <Form className="w-100">
                    {insideRegister && (
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                          type="text"
                          placeholder="Enter Username"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              username: e.target.value,
                            })
                          }
                          value={userData.username}
                        />
                      </Form.Group>
                    )}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            password: e.target.value,
                          })
                        }
                        value={userData.password}
                      />
                    </Form.Group>
                    {insideRegister ? (
                      <div>
                        <button
                          onClick={handleRegister}
                          className="btn btn-primary mb-2"
                        >
                          Register
                        </button>
                        <p>
                          Already have an account? Click here to{" "}
                          <Link to={"/login"}>Login</Link>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={handleLogin}
                          className="btn btn-primary mb-2"
                        >
                          Login
                          {loginStatus && (
                            <Spinner animation="border" size="sm" />
                          )}
                        </button>
                        <p>
                          New User? Create account here{" "}
                          <Link to={"/register"}>Register</Link>
                        </p>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
}

export default Auth;
