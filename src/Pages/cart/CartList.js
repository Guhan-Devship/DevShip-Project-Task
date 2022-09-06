import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import request from "../../api/api";

function CartList(props) {
  let navigate = useNavigate();

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

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to remove this Cart?"
      );
      if (ask) {
        request({
          url: `deleteCart/${id}`,
          method: "DELETE",
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }).then((res) => {
          toast.success("Removed", toastOptions);
          props.getdata();
        });
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  let handleRemoveCart = (item) => {
    let itemIndex = props.cart.findIndex((obj) => item === obj.id);
    console.log(itemIndex);
    props.cart.splice(itemIndex, 1);
    props.setCart([...props.cart]);
  };

  return (
    <>
      <div>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center li-style">
            <div class="ms-2 me-auto">
              {/* item name */}
              <div class="fw-bold">{props.list.title}</div>
              {/* item price */}
              {localStorage.getItem("myapptoken") ? (
                <div>
                  Rs {props.list.offerPrice} X {props.list.quantity}
                </div>
              ) : (
                <div>Rs {props.list.offerPrice} </div>
              )}
              <br></br>
              <span class="text-muted text-decoration-line-through">
                Rs{props.list.price}
              </span>
              {localStorage.getItem("myapptoken") ? (
                <div className="d-flex m-3 mx-4">
                  Qty
                  <button
                    className="btn-sm badge bg-secondary rounded-pill mx-2"
                    onClick={() => props.handleDecrement(props.list._id)}
                  >
                    -
                  </button>
                  {props.list.quantity}
                  <button
                    className="btn-sm badge bg-secondary rounded-pill mx-2"
                    onClick={() => props.handleIncrement(props.list._id)}
                  >
                    +
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {localStorage.getItem("myapptoken") ? (
              <div>Rs {props.list.offerPrice * props.list.quantity}</div>
            ) : (
              <div>Rs {props.list.offerPrice}</div>
            )}
            <img
              src={`http://localhost:2022/${props.list.image}`}
              className="img-fluid cart-img"
            />
            {/* button to remove item from the cart */}
            {localStorage.getItem("myapptoken") ? (
              <button
                class="btn badge bg-danger rounded-pill"
                onClick={() => handleDelete(props.list._id)}
              >
                X
              </button>
            ) : (
              <button
                class="btn badge bg-danger rounded-pill"
                onClick={() => handleRemoveCart(props.list._id)}
              >
                X
              </button>
            )}
          </li>
        </ul>
        <Toaster />
      </div>
    </>
  );
}

export default CartList;
