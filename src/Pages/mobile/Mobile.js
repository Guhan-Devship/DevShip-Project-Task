import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import MobileCard from "./MobileCard";
import Pagination from "../../Components/Pagination";

function Mobile() {
  let params = useParams();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [product, setProduct] = useState([]);
  const [serach, setSerach] = useState("");
  const [cartitems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);

  let handleCart = (item) => {
    setCartItems([...cartitems, item]);
    localStorage.setItem("cartList", JSON.stringify(cartitems));
    toast.success("Added", toastOptions);
  };
  useEffect(() => {
    let cartlist = localStorage.getItem("cartList");
    if (cartlist) {
      setCartItems(JSON.parse(cartlist));
    }
  }, []);

  let getdata = async () => {
    const { data } = await axios.get(
      `http://localhost:2022/category/${params.id}`
    );
    setProduct(data);
  };

  useEffect(() => {
    getdata();
  }, []);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Navbar />
      <form class="text-center form-inline mx-5 mt-2">
        <input
          class="form-control mr-sm-2"
          type="text"
          onChange={(e) => setSerach(e.target.value)}
          placeholder="Search"
          aria-label="Search"
        />
        <br />
      </form>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={product.length}
        paginate={paginate}
      />
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {currentPosts
              .filter((card) => {
                if (serach == "") {
                  return card;
                } else if (
                  card.title.toLowerCase().includes(serach.toLowerCase())
                )
                  return card;
              })
              .map((card) => {
                return (
                  <MobileCard productData={card} handleCart={handleCart} />
                );
              })}
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
}

export default Mobile;
