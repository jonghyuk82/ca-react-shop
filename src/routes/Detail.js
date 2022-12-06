/* eslint-disable */
import React, { useContext, useEffect, useState } from "react";
import { Alert, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import styled from "styled-components";

// 아래 styled-components를 사용하면 이 component에만 적용됨
// let YellowBtn = styled.button`
//   background: yellow;
//   color: black;
//   padding: 10px;
// `;

// let Btn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

// let NewBtn = styled.button(Btn)`
// font-size: 20px;
// `;
//

// Context API
import { Context1 } from "./../App.js";

// Redux Cart
import { addToCart } from "./../store";

function Detail(props) {
  // Context API
  // let state = useContext(Context1);
  // or
  let { inventory, shoes } = useContext(Context1);

  let { id } = useParams();
  let item = props.shoes.find((x) => {
    return x.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [alert2, setAlert2] = useState(false);
  let [num, setNum] = useState(1);
  let [tab, setTab] = useState(0);
  let [fadeAll, setFadeAll] = useState("");

  useEffect(() => {
    let current = JSON.parse(localStorage.getItem("watched"));
    if (current.length === 0) {
      localStorage.setItem("watched", JSON.stringify([item.id]));
    } else {
      current.unshift(item.id);
      // let unique = [...new Set(current)];
      // localStorage.setItem("watched", JSON.stringify(unique));
      current = new Set(current);
      current = Array.from(current);
      localStorage.setItem("watched", JSON.stringify(current));
    }
  }, []);

  // Redux
  let dispatch = useDispatch();

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(!alert);
    }, 2000);
    // clean up previous timer
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      setAlert2(true);
    } else {
      setAlert2(false);
    }
  }, [num]);

  useEffect(() => {
    setFadeAll("endAll");
    return () => {
      setFadeAll("");
    };
  }, []);

  return (
    // <div className="container startAll endAll">
    <div className={`container startAll ${fadeAll}`}>
      {alert == true ? (
        <div className="alert alert-warning">
          if you buy in 2 sec, you get discount
        </div>
      ) : null}

      {alert2 == true ? (
        <Alert variant="danger">You must enter numbers</Alert>
      ) : null}

      {/* <Box> */}
      {/* <YellowBtn>Button</YellowBtn> */}
      {/* <Btn bg="blue">Button</Btn> */}
      {/* <NewBtn bg="red">Button2</NewBtn> */}
      {/* </Box> */}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (parseInt(id) + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6">
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4> */}
          <input
            className="form-control"
            onChange={(e) => {
              setNum(e.target.value);
            }}
            value={num}
          ></input>
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addToCart({ item: item, num: num }));
            }}
          >
            Order
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            Link 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            Link 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            Link 3
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* {tab == 0 ? (
        <div>page1</div>
      ) : tab == 1 ? (
        <div>page2</div>
      ) : tab == 2 ? (
        <div>page3</div>
      ) : null} */}
      <TabContent tab={tab} />
    </div>
  );
}
// function TabContent(props) {
//   if (props.tab == 0) {
//     return <div>page1</div>;
//   } else if (props.tab == 1) {
//     return <div>page2</div>;
//   } else if (props.tab == 2) {
//     return <div>page3</div>;
//   }
// }

function TabContent({ tab }) {
  // Context API
  let { inventory } = useContext(Context1);

  let [fade, setFade] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      clearTimeout(timer);
      setFade("");
    };
  }, [tab]);
  return (
    // <div className={'start' + fade }>
    <div className={`start ${fade}`}>
      {[<div>{inventory}</div>, <div>page2</div>, <div>page3</div>][tab]}
    </div>
  );
}

export default Detail;
