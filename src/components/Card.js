/* eslint-disable */
import React from "react";
import { NavLink } from "react-router-dom";

function Card(props) {
  return (
    <>
      <div className="col-md-4">
        {/* Link or NavLink both can be used  */}

        {/* <Link to={/detail/ + props.i}>
          <img
            src={process.env.PUBLIC_URL + "/img/shoes" + (props.i + 1) + ".jpg"}
            width="80%"
          />
        </Link> */}
        <NavLink to={/detail/ + props.i} >
          {/* 이미지를 public folder에서 가져와 사용하거나 서버에서 직접 가져와서 사용 */}
          {/* <img
            src={process.env.PUBLIC_URL + "/img/shoes" + (props.i + 1) + ".jpg"}
            width="80%"
          /> */}
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (parseInt(props.i) + 1) +
              ".jpg"
            }
            width="80%"
          />
        </NavLink>
        <h4>{props.shoes.title}</h4>
        <h4>{props.shoes.price}</h4>
      </div>
    </>
  );
}

export default Card;
