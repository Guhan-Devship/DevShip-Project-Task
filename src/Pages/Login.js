import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import request from "../api/api";

function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = value;
    // const data = await axios.post("http://localhost:2022/login", {
    //   email,
    //   password,
    // });
    // console.log(data.data.response);
    request({
      url: `login`,
      method: "POST",
      data: value,
    }).then((res) => {
      if (res.response.message !== "Login Successfully") {
        toast.error(res.response.message, toastOptions);
      }
      if (res.response.message === "Login Successfully") {
        toast.success(res.response.message, toastOptions);
        window.localStorage.setItem("myapptoken", res.response.authToken);
        window.localStorage.setItem("id", res.response.id);
        let storageData = JSON.parse(localStorage.getItem("cartList"));
        if (!storageData) {
          navigate("/");
        } else {
          for (var i = 0; i < storageData.length; i++) {
            if (localStorage.getItem("myapptoken")) {
              request({
                url: "newCart",
                method: "POST",
                data: storageData[i],
                headers: {
                  Authorization: window.localStorage.getItem("myapptoken"),
                },
              }).then((res) => {
                if (res) {
                  navigate("/cart");
                  localStorage.removeItem("cartList");
                } else {
                  navigate("/");
                }
              });
              //   axios.post("http://localhost:2022/newCart", storageData[i], {
              //     headers: {
              //       Authorization: window.localStorage.getItem("myapptoken"),
              //     },
              //   });
              //   navigate("/cart");
              //   localStorage.removeItem("cartList");
              // } else {
              //   navigate("/");
            }
          }
        }
      }
    });
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="phone-container">
        <h1 className="mb-3">Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="form-group mb-2">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              min="3"
            />
          </div>
          <div class="form-group mb-2">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="submit"
            class="form-control btn btn-primary btn-sm mb-3"
            value={"Login"}
          />
          <div>
            <p className="forgot-font">
              <Link to={"/forgotPassword"}>Forgot password?</Link>
            </p>
          </div>
        </form>
        <p>
          By entering your data, you're agreeing to our{" "}
          <span>Terms of Service and Privacy Policy</span>.Thanks!
        </p>
        <span>
          Don't have account? <Link to={"/register"}>Register</Link>
        </span>
        <Toaster />
      </div>
    </>
  );
}

export default Login;
