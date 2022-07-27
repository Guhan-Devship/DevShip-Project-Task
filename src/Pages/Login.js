import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

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
    const data = await axios.post("http://localhost:2022/login", {
      email,
      password,
    });
    console.log(data.data.response);
    if (data.data.response.message !== "Login Successfully") {
      toast.error(data.data.response.message, toastOptions);
    }
    if (data.data.response.message === "Login Successfully") {
      toast.success(data.data.response.message, toastOptions);
      navigate("/home");
    }
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
