import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  let navigate = useNavigate();
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
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { email, password } = value;
    if (email.length === "") {
      toast.error("Email  is required", toastOptions);
      return false;
    } else if (password.length === "") {
      toast.error("Password  is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password } = value;
      const data = await axios.post(
        "http://localhost:2022/change/password",
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      if (data.data.status !== 1) {
        toast.error(data.data.response, toastOptions);
      }
      if (data.data.status === 1) {
        toast.success(data.data.response, toastOptions);
        navigate("/");
      }
    }
  };
  return (
    <>
      <div>
        <div className="phone-container">
          <h1 className="mb-3">Enter Mail Id</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group mb-2">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div class="form-group mb-2">
              <input
                type="password"
                placeholder="New Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <input
              type="submit"
              class="form-control btn btn-primary btn-sm mb-3"
              value={"Send OTP"}
            />
          </form>
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
