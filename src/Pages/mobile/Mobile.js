import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import MobileCard from "./MobileCard";
import Pagination from "react-js-pagination";

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
  const [cartitems, setCartItems] = useState([]);
  const [activepage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  const [aggreagte, setAggregate] = useState({
    search: "",
    filterPrice: 0,
    field: false,
    limit: 4,
    skip: 0,
    category: params.id,
    product: "",
  });
  console.log(aggreagte);

  const paginate = (data) => {
    const limit = aggreagte.limit;
    if (data) {
      setActivePage(data);
      setCurrentPage(limit);
      setAggregate((state) => {
        return {
          ...state,
          skip: data * limit - limit,
        };
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    setTimeout(() => {
      setAggregate((state) => ({
        ...state,
        [id]: value,
      }));
    }, 2000);
  };
  // const handleChangeInput = (e) => {
  //   e.preventDefault();
  //   const id = e.target.id;
  //   const value = e.target.value;
  //   setTimeout(() => {
  //     setAggregate((state) => ({
  //       ...state,
  //       [id]: value,
  //     }));
  //   }, 2000);
  // };
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

  let aggregateApi = async () => {
    const { data } = await axios.post(
      "http://localhost:2022/products",
      aggreagte
    );
    setProduct(data.response.result);
    setPages(data.response.fullcount);
  };
  useEffect(() => {
    aggregateApi();
  }, [aggreagte]);

  return (
    <div>
      <Navbar />
      <form class="text-center form-inline mx-5 mt-2">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          id="search"
          onChange={handleChange}
          aria-label="Search"
        />
        <br />
        <input
          class="form-control mr-sm-2"
          type="number"
          placeholder="Max-Price"
          id="filterPrice"
          onChange={handleChange}
        />
        <select
          className="form-control col-2 mx-1"
          id="field"
          onChange={handleChange}
          placeholder="Price Range"
        >
          <option>Price Range</option>
          <option value={false}>High to Low</option>
          <option value={true}>Low to High</option>
        </select>
      </form>
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {product.map((card) => {
              return <MobileCard productData={card} handleCart={handleCart} />;
            })}
          </div>
        </div>
        <Pagination
          prevPageText={<i class="fa fa-angle-left"></i>}
          nextPageText={<i class="fa fa-angle-right"></i>}
          firstPageText={<i class="fa fa-angle-double-left"></i>}
          lastPageText={<i class="fa fa-angle-double-right"></i>}
          activePage={activepage}
          itemsCountPerPage={currentPage}
          totalItemsCount={pages}
          // pageRangeDisplayed={}
          onChange={paginate}
          itemClass="page-item"
          linkClass="page-link"
        />
      </section>
      <Toaster />
    </div>
  );
}

export default Mobile;
