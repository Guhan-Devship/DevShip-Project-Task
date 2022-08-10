import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Checkout from "./Checkout";
import CartList from "./CartList";

function Cart() {
  let navigate = useNavigate();
  let userId = localStorage.getItem("id");
  let address = localStorage.getItem("address");
  let shipaddress = localStorage.getItem("Shipaddress");
  const [openModal, setOpenModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState({
    quantity: 1,
  });
  let token = localStorage.getItem("myapptoken");

  //cart List from BackEnd
  let getdata = async () => {
    const { data } = await axios.get("http://localhost:2022/allCart", {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    setCart(data);
  };
  //local storage of add cart before Login
  let storageData = () => {
    if (!token) {
      setCart(JSON.parse(localStorage.getItem("cartList")));
    }
  };

  useEffect(() => {
    if (!token) {
      storageData();
    } else {
      getdata();
    }
  }, []);

  //total
  let total = 0;
  cart.map((e) => {
    if (token) return (total += e.offerPrice * e.quantity);
    total += e.offerPrice;
  });
  //checkout page click function
  const handleClick = () => {
    if (localStorage.getItem("myapptoken")) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  //increment of quantity
  const handleIncrement = (cart_id) => {
    console.log(cart_id);
    setCart((cart) =>
      cart.map((item) => {
        return cart_id === item._id
          ? {
              ...item,
              quantity: setQty((prevstate) => ({
                ...prevstate,
                quantity: item.quantity + (item.quantity < 5 ? 1 : 0),
              })),
            }
          : item;
      })
    );
    updateCartQuantity(cart_id);
  };
  //Decrement of quantity
  const handleDecrement = (cart_id) => {
    console.log(cart_id);
    setCart((cart) =>
      cart.map((item) => {
        return cart_id === item._id
          ? {
              ...item,
              quantity: setQty((prevstate) => ({
                ...prevstate,
                quantity: item.quantity - (item.quantity > 1 ? 1 : 0),
              })),
            }
          : item;
      })
    );
    updateCartQuantity(cart_id);
  };

  //post request for quantity
  const updateCartQuantity = async (cart_id) => {
    axios.put(`http://localhost:2022/updateCart/${cart_id}`, qty);
    getdata();
  };

  return (
    <div>
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <div className="cartlist-container">
            {cart.map((list) => {
              return (
                <CartList
                  list={list}
                  cart={cart}
                  setCart={setCart}
                  getdata={getdata}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              );
            })}
          </div>
          {cart.length > 0 ? (
            <>
              <div>
                <h1 className="col-lg-12 text-center fs-4 mt-5">
                  Total({cart.length}): Rs {total}
                </h1>
              </div>
              <button className="btn-primary btn-sm" onClick={handleClick}>
                CheckOut
              </button>
            </>
          ) : (
            <div>
              <h1 className="col-lg-12 text-center">No Item in Cart</h1>
            </div>
          )}
        </div>
      </>
      {openModal && (
        <Checkout setOpen={setOpenModal} cart={cart} total={total} />
      )}
    </div>
  );
}

export default Cart;
