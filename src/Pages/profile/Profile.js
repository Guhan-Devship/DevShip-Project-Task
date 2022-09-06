import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import request from "../../api/api";

function Profile() {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let userId = localStorage.getItem("id");
  const [user, setUserData] = useState([]);
  const [inputFields, setInputField] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [shipAddress, setShipAddress] = useState([]);
  const [addressDefault, setAddressDefault] = useState({
    billingAddress: true,
  });
  function checkData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  useEffect(() => {
    checkData();
  });

  let handleAddress = async (id) => {
    setAddressDefault({ billingAddress: true });
    if (addressDefault.billingAddress === true) {
      request({
        url: `updateBillingAddress/${id}`,
        method: "PUT",
        data: addressDefault,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
    }
    window.location.reload(false);
  };

  async function fetchData() {
    let user = await axios.get(`http://localhost:2022/getUser/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    setUserData({
      id: user.data._id,
      first_name: user.data.first_name,
      email: user.data.email,
      phone: user.data.phone,
    });
  }

  async function fetchAll() {
    try {
      let listData = await axios.get(
        `http://localhost:2022/billingAddress/${userId}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      setUserAddress(listData.data);
      console.log(listData.data);
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  }
  useEffect(() => {
    fetchData();
    fetchAll();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getShippingAddress/${userId}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        setShipAddress(res.data);
      });
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangeOutput = (index, event) => {
    const values = [...userAddress];
    values[index][event.target.id] = event.target.value;
    setUserAddress(values);
    console.log(values);
  };
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.id] = event.target.value;
    setInputField(values);
  };
  const handleUpdate = async () => {
    const updateData = await axios
      .put(`http://localhost:2022/updateUser/${userId}`, user, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        alert("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddField = () => {
    setInputField([
      ...inputFields,
      {
        name: "",
        email: "",
        phone: "",
        line1: "",
        line2: "",
        state: "",
        city: "",
        country: "",
        pincode: "",
      },
    ]);
  };
  const handleRemoveField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };
  let handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this member?"
      );
      if (ask) {
        await axios.delete(
          `http://localhost:2022/deleteAddress/${id}/${userId}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
        toast.success("Removed", toastOptions);
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleValidation = () => {
    const [
      { name, phone, email, line1, line2, city, state, country, pincode },
    ] = inputFields;
    if (name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (phone < 10) {
      toast.error("10 number Required", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email Required", toastOptions);
      return false;
    } else if (line1 === "") {
      toast.error("line1 is required.", toastOptions);
      return false;
    } else if (line2 === "") {
      toast.error("line2 is required", toastOptions);
      return false;
    } else if (city === "") {
      toast.error("city is required", toastOptions);
      return false;
    } else if (state === "") {
      toast.error("state is required", toastOptions);
      return false;
    } else if (country === "") {
      toast.error("country is required", toastOptions);
      return false;
    } else if (pincode === "") {
      toast.error("pincode is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < inputFields.length; i++) {
      if (handleValidation()) {
        const data = await axios.post(
          `http://localhost:2022/billingAddress/${userId}`,
          inputFields[i],
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );

        if (data.data.message !== "created") {
          toast.error(data.data.message, toastOptions);
        }
        if (data.data.message === "created") {
          toast.success("SuccessFully Created", toastOptions);
          fetchAll();
          window.location.reload();
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 class="mb-2 text-primary">Personal Details</h6>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter full name"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="eMail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email ID"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  placeholder="Enter phone number"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn-sm btn-danger"
                onClick={() => handleUpdate()}
              >
                update
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <h5 className="mt-3">Billing Address</h5>
          {userAddress.map((address, index) => (
            <div className="col-4">
              <div class="card text-dark mt-3 mb-3">
                <div class="card-header">
                  Address
                  {address.billingAddress === true ? (
                    <i class="bi bi-check2-square ms-4 text-primary">
                      {" "}
                      Default address
                    </i>
                  ) : (
                    ""
                  )}
                </div>
                <div class="card-body" key={index}>
                  <form>
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="text"
                          class="form-control mt-1"
                          placeholder="First Name"
                          id="name"
                          name="name"
                          value={address.name}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          class="form-control mt-1"
                          id="phone"
                          placeholder="Phone"
                          name="phone"
                          value={address.phone}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                    </div>
                    <input
                      type="email"
                      class="form-control mt-1"
                      placeholder="Email"
                      id="email"
                      value={address.email}
                      onChange={(event) => handleChangeOutput(index, event)}
                    />
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="text"
                          class="form-control mt-1"
                          placeholder="Line 1"
                          id="line1"
                          value={address.line1}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="Line 2"
                          class="form-control mt-1"
                          id="line2"
                          value={address.line2}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="State"
                          class="form-control mt-1"
                          id="state"
                          value={address.state}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="City"
                          class="form-control mt-1"
                          id="city"
                          value={address.city}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="Country"
                          class="form-control mt-1"
                          id="country"
                          value={address.country}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="Pincode"
                          class="form-control mt-1"
                          id="pincode"
                          value={address.pincode}
                          onChange={(event) => handleChangeOutput(index, event)}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-danger btn-sm mt-3"
                      onClick={(e) => handleDelete(e, address._id)}
                    >
                      Delete
                    </button>
                    {address.billingAddress ? (
                      <i class="bi bi-check2-square m-2"></i>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm mt-3 ms-2"
                        onClick={() => handleAddress(address._id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button className="btn btn-warning btn-sm mt-3 ms-2">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {inputFields.map((inputField, index) => (
            <div className="col-4">
              <div class="card text-dark mt-3 mb-3">
                <div class="card-header">Address</div>
                <div class="card-body" key={index}>
                  <form>
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="text"
                          class="form-control mt-1"
                          placeholder="First Name"
                          id="name"
                          value={inputField.name}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          class="form-control mt-1"
                          id="phone"
                          placeholder="Phone"
                          value={inputField.phone}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                    </div>
                    <input
                      type="email"
                      class="form-control mt-1"
                      placeholder="Email"
                      id="email"
                      value={inputField.email}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="text"
                          class="form-control mt-1"
                          placeholder="Line 1"
                          id="line1"
                          value={inputField.line1}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="Line 2"
                          class="form-control mt-1"
                          id="line2"
                          value={inputField.line2}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="State"
                          class="form-control mt-1"
                          id="state"
                          value={inputField.state}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="City"
                          class="form-control mt-1"
                          id="city"
                          value={inputField.city}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="Country"
                          class="form-control mt-1"
                          id="country"
                          value={inputField.country}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          placeholder="Pincode"
                          class="form-control mt-1"
                          id="pincode"
                          value={inputField.pincode}
                          onChange={(event) => handleChangeInput(index, event)}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-danger btn-sm mt-3"
                      onClick={() => handleRemoveField()}
                    >
                      Delete
                    </button>
                    <button className="btn btn-primary btn-sm mt-3 ms-2">
                      Set Default
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn-primary btn-sm btn mt-3"
          onClick={() => handleAddField()}
          disabled={userAddress.length >= 3 || inputFields.length >= 3}
        >
          Add
        </button>
        <button
          className="btn-primary btn-sm btn ms-2 mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <Toaster />
      </div>
    </>
  );
}

export default Profile;
