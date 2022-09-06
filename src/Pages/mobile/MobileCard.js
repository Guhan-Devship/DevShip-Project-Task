import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import request from "../../api/api";

function MobileCard(props) {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async () => {
    if (() => props.handleCart()) {
      request({
        url: `newCart`,
        method: "POST",
        data: props.productData,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        if (res.message !== "cartList Created") {
          toast.error(res.message, toastOptions);
        }
        if (res.message === "cartList Created") {
          toast.success("Added to cart", toastOptions);
        }
      });
    }
  };
  return (
    <div class="col mb-5">
      <div class="card h-100">
        {/* sale badge */}
        {props.productData.stockAvailability ? (
          <div class="badge bg-dark text-white position-absolute sale p-1">
            In stock
          </div>
        ) : (
          <div class="badge bg-dark text-danger position-absolute sale p-1 mt-5 text-center">
            Not Available
          </div>
        )}
        {/* image */}
        <img
          class="card-img-top rounded"
          src={`http://localhost:2022/${props.productData.image}`}
          alt="..."
        />
        {/* product details */}
        <div class="card-body p-1">
          <div class="text-center">
            <p class="fw-bolder title mb-0">{props.productData.title}</p>
            {/* strike the price */}

            <p className="fst-italic fs-6 mb-0">{props.productData.desc}</p>

            <div>
              Original price:
              <span class="text-muted text-decoration-line-through">
                &#x20b9; {props.productData.price}
              </span>
              <br></br>
              <span className="mb-3">
                <strong>
                  Offer price: &#x20b9; {props.productData.offerPrice}{" "}
                </strong>
              </span>
            </div>
          </div>
        </div>
        {/* button */}
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div class="text-center">
            {localStorage.getItem("myapptoken") ? (
              <button
                disabled={!props.productData.stockAvailability}
                class="btn btn-outline-dark mt-auto"
                onClick={() => handleSubmit()}
              >
                Add Cart
              </button>
            ) : (
              <button
                disabled={!props.productData.stockAvailability}
                onClick={() => props.handleCart(props.productData)}
                class="btn btn-outline-dark mt-auto"
              >
                Add Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default MobileCard;
