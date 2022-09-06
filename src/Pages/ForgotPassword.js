import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import request from "../api/api";
import Otp from "./Otp";

function ForgotPassword() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { email } = value;
    if (email.length === "") {
      toast.error("Email  is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email } = value;
      request({
        url: `forgot/password`,
        method: "POST",
        data: value,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        if (res.status !== 1) {
          toast.error(res.response, toastOptions);
        }
        if (res.status === 1) {
          toast.success(res.response, toastOptions);
        }
      });
      setOpenModal(true);
    }
  };
  return (
    <div>
      <>
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
            <input
              type="submit"
              class="form-control btn btn-primary btn-sm mb-3"
              value={"Send OTP"}
            />
          </form>
          <Toaster />
        </div>
      </>
      {openModal && <Otp setOpen={setOpenModal} />}
    </div>
  );
}

export default ForgotPassword;
