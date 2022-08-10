import React from "react";
import { Link } from "react-router-dom";

function HomeCard(props) {
  return (
    <>
      <div className="text-center mt-5 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
        <Link to={`/view/${props.list.title}`}>
          <img
            src={`http://localhost:2022/${props.list.image}`}
            class="img-fluid btn product-img"
            alt="..."
          />
        </Link>
      </div>
    </>
  );
}

export default HomeCard;
