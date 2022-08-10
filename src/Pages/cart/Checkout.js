import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function Checkout({ setOpen, cart, total }) {
  let address = JSON.parse(localStorage.getItem("address"));
  console.log(address);
  function fetchData() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/login");
    }
  }
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let navigate = useNavigate();
  let userId = localStorage.getItem("id");
  const [billAddress, setBillAddress] = useState([]);
  console.log(billAddress);
  console.log(cart);

  useEffect(() => {
    fetchData();
  });
  useEffect(() => {
    axios
      .get(`http://localhost:2022/billingaddress/${userId}`, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          navigate("/profile");
        }
        setBillAddress(res.data);
      });
  }, []);

  const handleSubmit = async () => {
    for (let i = 0; i < cart.length; i++) {
      const data = await axios.post(
        "http://localhost:2022/new/order",
        Object.assign(cart[i], address),
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      if (data.data.message !== "ordered") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "ordered") {
        toast.success(data.data.message, toastOptions);
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
          <span>Bill </span>
          <div className="row">
            {billAddress.filter((value) => value.billingAddress === false)
              .length > 2 ? (
              (navigate("/profile"), alert("Error : Set a default Address"))
            ) : (
              <div className="col-6">
                Billing Address
                {billAddress.map((item) => {
                  if (item.billingAddress === true) {
                    localStorage.setItem("address", JSON.stringify(item));
                    return (
                      <p className="address">
                        <strong>Name</strong>: {item.name} <br></br>{" "}
                        <strong>Mobile</strong> :{item.phone}
                        <br></br>
                        <strong> Address</strong>:{item.line1},{item.line2}
                        <br></br>
                        {item.city}, {item.state}, {item.pincode}
                      </p>
                    );
                  }
                })}
              </div>
            )}
          </div>
          <div className="bill-container">
            {cart.map((item) => (
              <div className="rItem">
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  {/* <div className="rDesc">&#x20b9;</div> */}
                  <div className="rMax">
                    Max Discount: <b>25%</b>
                  </div>
                  <div className="rPrice">
                    &#x20b9; {item.offerPrice} X {item.quantity}
                  </div>
                  <div className="rPrice">
                    <strong>Total</strong> &#x20b9;{" "}
                    {item.offerPrice * item.quantity}
                  </div>
                </div>
                <div className="rPrice">
                  <img
                    className="img-fluid checkout-img"
                    src={`http://localhost:2022/${item.image}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-center mt-5">
              <h5>Cart Total</h5>({cart.length}): Rs {total}
            </p>
          </div>

          <button className="rButton" onClick={() => handleSubmit()}>
            paynow
          </button>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Checkout;
