import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let users = window.localStorage.getItem("myapptoken");
  let handleLogout = () => {
    window.localStorage.removeItem("myapptoken");
    window.localStorage.clear();
    navigate("/");
  };
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
        {users ? (
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
                  user
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item">user</a>
                  <a class="dropdown-item">mobile</a>
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
