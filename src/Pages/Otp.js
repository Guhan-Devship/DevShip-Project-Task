import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Otp({ setOpen }) {
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
    otp: 0,
  });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { email, otp } = value;
    if (email.length === "") {
      toast.error("Email  is required", toastOptions);
      return false;
    } else if (otp === null) {
      toast.error("Otp  is required", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, otp } = value;
      const data = await axios.post(
        "http://localhost:2022/verify/otp",
        {
          email,
          otp,
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
        navigate("/changePassword");
      }
    }
  };
  return (
    <>
      <div className="reserve">
        <div className="rContainer">
          <button
            className="btn btn-sm btn-danger rounded-circle mx-1"
            onClick={() => setOpen(false)}
          >
            X
          </button>
          <span> Enter OTP</span>

          <div className="phone-contaniner mt-3">
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
                  type="number"
                  placeholder="OTP"
                  name="otp"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <input
                type="submit"
                class="form-control btn btn-primary btn-sm mb-3"
                value={"Verify OTP"}
              />
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Otp;
