import React, { memo, useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "./../store/userSlice";
import { addCount, removeFromCart } from "./../store";

// using Memo : prevent re-rendering
// props가 변경될때 re-rendering도게 할수 있음
let Child = memo(function () {
  console.log("rendering");
  return <div>child</div>;
});

// useMemo
// function func(){
//   return 반복문 10억번 돌린결과
// }

function Cart() {
  // using redux
  /* let a = useSelector((state) => {
    return state.user;
  });
  or */
  //   let a = useSelector((state) => state.user);

  // get redux data
  //   let state = useSelector((state) => state);
  let user = useSelector((state) => state.user);
  let item = useSelector((state) => state.cartItem);

  // using redux data update
  let dispatch = useDispatch();

  // using Memo
  let [count, setCount] = useState(0);

  //useMemo: useEffect와 동일하지만 실행 시점이 html과 동일한 시점에 실행됨
  // let result = useMemo(() => {return func()}, [state])

  return (
    <div>
      {/* using Memo */}
      {/* <Child count={count}></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button> */}
      <h6>
        {user.name} {user.age}'s Cart
      </h6>
      {/* <button
        onClick={() => {
          dispatch(changeAge(10));
        }}
      >
        Button
      </button> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>QTY</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {state.cartItem.map((a, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{state.cartItem[i].name}</td>
              <td>{state.cartItem[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeName());
                  }}
                >
                  +
                </button>
              </td>
              <td>{state.user.name}</td>
            </tr>
          ))} */}
          {item.map((a, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {/* <td>{item[i].id}</td> */}
              <td>{item[i].name}</td>
              <td>{item[i].count}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    // dispatch(changeName());
                    dispatch(addCount(item[i].id));
                  }}
                >
                  +
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => {
                    // dispatch(changeName());
                    dispatch(removeFromCart(item[i].id));
                  }}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
