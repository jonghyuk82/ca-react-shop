/* eslint-disable */
import "./App.css";
import { Button, Navbar, Container, Nav, Spinner } from "react-bootstrap";
import bg from "./img/bg.png";
import { createContext, lazy, Suspense, useEffect, useState } from "react";

// import data from "./data"; // only one exported value in the data, 작명할 수 있지만
// import { a, b } from "./data"; // more than one exported value in the data 이건 작명할 수 없다
import data from "./data";

import Card from "./components/Card";
// import Detail from "./routes/Detail";
// import Cart from "./routes/Cart";
import About from "./routes/About";
import Event from "./routes/Event";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Batching from "./routes/Batching";

//  Lazy loading - if this component is needed then load it
//  Suspense를 사용해서 loading될때 지연되는 상황에 loading spinner를 보여줄수 있다
//  Suspense로 Route를 감싸서 사용한다
const Detail = lazy(() => import("./routes/Detail"));
const Cart = lazy(() => import("./routes/Cart"));

// Context API
export let Context1 = createContext();

function App() {
  // Local Storage start
  // let obj = { name: "lee" };

  // localStorage.setItem("data", JSON.stringify(obj));
  // let aa = localStorage.getItem("data");
  // console.log(JSON.parse(aa).name);

  useEffect(() => {
    let isExist = localStorage.getItem("watched");
    if (isExist == null) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  // Lcal storage end

  let [shoes, setShoes] = useState(data);
  let [inventory, setInventory] = useState([10, 11, 12]);

  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [count, setCount] = useState(2);
  let [last, setLast] = useState(false);

  let [watched, setWatched] = useState([]);

  // function getPrev() {
  //   let prev = JSON.parse(localStorage.getItem("watched"));
  //   if (prev.length !== 0) {
  //     for (let i = 0; i < prev.length; i++) {
  //       let prevItem = shoes.filter((x) => x.id === prev[i]);
  //       setWatched(prevItem);
  //     }
  //   }
  // }

  useEffect(() => {
    let a = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(a);
      setLoading(true);
    };
  }, [shoes]);

  useEffect(() => {
    let prev = JSON.parse(localStorage.getItem("watched"));
    if (prev.length !== 0) {
      for (let i = 0; i < prev.length; i++) {
        let prevItem = shoes.filter((x) => x.id === prev[i]);
        let a = [...watched];
        a.unshift(prevItem);
        setWatched(a);
      }
    }
  }, []);

  // axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
  //   a.data;
  // });

  // react-query (automatically re-fetch)
  let result = useQuery(["query"], () => {
    return (
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
      { staleTime: 2000 }
    );
  });

  // console.log(result.data);
  // console.log(result.isLoading);
  // console.log(result.error);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            Shoe Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/batching");
              }}
            >
              Batching
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={{ color: "white" }}>
            {/* {result.isLoading ? "loading..." : result.data.name} */}
            {/* or */}
            {result.isLoading && "loading..."}
            {result.error && "error"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {/* using image from js */}
      {/* <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div> */}
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <div className="container">
                  {loading == true ? (
                    <Spinner animation="border" variant="primary" />
                  ) : null}

                  <div className="row">
                    {watched.map((b, i) => {
                      return console.log(watched);
                    })}
                    {shoes.map((a, i) => {
                      return <Card shoes={shoes[i]} i={i} key={i}></Card>;
                    })}
                  </div>
                </div>
                {last == false ? (
                  <button
                    onClick={() => {
                      setLoading(true);
                      {
                        count < 4
                          ? axios
                              .get(
                                "https://codingapple1.github.io/shop/data" +
                                  count +
                                  ".json"
                              )
                              .then((result) => {
                                // 아래 둘중 하나 쓰면 됨
                                // let copy = [...shoes];
                                // copy = copy.concat(result.data);
                                let copy = [...shoes, ...result.data];

                                setCount(count + 1);
                                count == 3 ? setLast(true) : null;
                                setShoes(copy);
                                setLoading(false);
                              })
                              .catch(() => {
                                setLoading(false);
                                console.log("fail");
                              })
                          : setLast(true);
                      }
                      setLoading(false);
                    }}
                  >
                    More
                  </button>
                ) : null}
              </>
            }
          />

          {/* ROUTES */}
          {/* using Context API */}
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ inventory, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          {/* up to here using Context API */}
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>member</div>} />
            {/* this url is about/member */}
            <Route path="location" element={<div>Location</div>} />
            {/* this url is about/location */}
          </Route>
          {/* this is nested routes */}
          <Route path="*" element={<div>Wrong</div>} />
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
          <Route path="/batching" element={<Batching />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
