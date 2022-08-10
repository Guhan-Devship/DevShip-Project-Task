import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import sale from "../images/sale.png";
import shopping from "../images/shopping.png";
import HomeCard from "./HomeCard";

function Home() {
  let navigate = useNavigate();

  const [category, setCategory] = useState([]);
  let getdata = async () => {
    const { data } = await axios.get("http://localhost:2022/getCategory");
    setCategory(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Navbar />
      <div className="conatiner-fluid">
        <div className="row shop-card">
          <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <img className="img-fluid sale-img" src={sale} />
            <img className="img-fluid shop-img" src={shopping} />
          </div>
          {category.map((list) => {
            return <HomeCard list={list} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
