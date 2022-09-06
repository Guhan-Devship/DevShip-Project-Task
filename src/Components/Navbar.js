import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../api/api";

function Navbar() {
  let navigate = useNavigate();
  let userId = localStorage.getItem("id");
  console.log(userId);
  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken");
    window.localStorage.clear();
    navigate("/");
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAPI = () => {
    setLoading(true);
    request({
      url: `getUser/${userId}`,
      method: "GET",
      data: data,
    }).then((res) => {
      setLoading(false);
      setData(res);
    });
  };
  useEffect(() => {
    if (userId) {
      getAPI();
    }
  }, []);
  return (
    <>
      <nav id="navbar-example2" class="navbar navbar-light bg-dark">
        <Link to={"/"} class="navbar-brand text-white">
          User Page
        </Link>
        <Link to={"/cart"}>
          <button class="btn btn-outline-primary" type="submit">
            <i class="bi-cart-fill me-1"></i>
            {/* <i class="fa fa-shopping-cart" aria-hidden="true"></i> */}
            Cart
            <span class="badge bg-primary text-white ms-1 rounded-pill"></span>
          </button>
        </Link>
        <ul class="nav nav-pills">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-list" aria-hidden="true"></i>
              Categories
            </a>
            <div class="dropdown-menu">
              <Link to={"/view/mobile"} class="dropdown-item">
                Mobile
              </Link>
              <Link to={"/view/shoe"} class="dropdown-item">
                Shoe
              </Link>
              <div role="separator" class="dropdown-divider"></div>
            </div>
          </li>
        </ul>
        {userId ? (
          <>
            <ul class="nav nav-pills">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-user" aria-hidden="true"></i>
                  {data.first_name}
                  {console.log(data)}
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item">{data.first_name}</a>
                  <a class="dropdown-item">{data.phone}</a>
                  <Link to={"/profile"}>
                    <button className="btn-sm btn-primary mx-4">
                      <i class="fa fa-pencil" aria-hidden="true">
                        edit
                      </i>
                    </button>
                  </Link>
                  <div role="separator" class="dropdown-divider"></div>
                  <a class="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <ul class="nav nav-pills">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-user" aria-hidden="true"></i>
                Login
              </a>
              <div class="dropdown-menu">
                <Link to={"/login"} class="dropdown-item">
                  Login
                </Link>
                <div role="separator" class="dropdown-divider"></div>
                <Link to={"/register"} class="dropdown-item">
                  Register
                </Link>
              </div>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;
