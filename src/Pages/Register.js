import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [value, setValue] = useState({
    first_name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, first_name, surname, email } = value;
    const data = await axios.post("http://localhost:2022/register", {
      first_name,
      surname,
      email,
      password,
      confirmPassword,
    });
    if (data.data.message === "Email already exists") {
      toast.error(data.data.message, toastOptions);
    }
    if (data.data.message === "Password not match") {
      toast.error(data.data.message, toastOptions);
    }
    if (data.data.message === "User Created") {
      toast.success("SuccessFully Created", toastOptions);
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="phone-container">
        <h1 className="mb-3">Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="form-group mb-2">
            <input
              type="text"
              placeholder="Name"
              name="first_name"
              onChange={(e) => handleChange(e)}
              min="3"
            />
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              placeholder="Surname"
              name="surname"
              onChange={(e) => handleChange(e)}
              min="3"
            />
          </div>
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
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div class="form-group mb-2">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type="submit"
            class="form-control btn btn-primary btn-sm mb-3"
            value={"Register"}
          />
        </form>
        <span>
          Already have account? <Link to={"/"}>Login</Link>
        </span>
        <Toaster />
      </div>
    </>
  );
}

export default Register;
