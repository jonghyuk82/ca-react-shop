import React, { useDeferredValue, useState, useTransition } from "react";

let a = new Array(10000).fill(0);

function Batching() {
  let [name, setName] = useState("");

  // useTransition: startTransition function안에 있는 코드를 약간 늦게 실행시킴
  let [isPending, startTransition] = useTransition();

  // useDeferredValue: function안에 있는 state를 약간 늦게 처리함. useTransition과 비슷함
  let state = useDeferredValue("state name");

  return (
    <div className="App">
      <input
        onChange={(e) => {
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      />
      {isPending
        ? "loading..."
        : a.map((b, i) => {
            return <div key={i}>{name}</div>;
          })}
    </div>
  );
}

export default Batching;
