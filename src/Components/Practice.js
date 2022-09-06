import React, { useEffect, useState } from "react";
import request, { NodeURL } from "../api/api";

function Practice() {
  const [data, setData] = useState([]);
  const getAPI = () => {
    request({
      url: "all/order",
      method: "GET",
      data: setData,
    }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    getAPI();
  }, []);
  return (
    <>
      <div>Guhan</div>
      {console.log(data)}
    </>
  );
}

export default Practice;
