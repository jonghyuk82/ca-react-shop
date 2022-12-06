import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "Lee", age: 40 },
  reducers: {
    // changeName(state) {
    //   return "john " + state;
    // },
    // changeName(state) {
    //   return { name: "Park", age: 40 };
    // },
    // or
    changeName(state) {
      state.name = "Park";
    },
    changeAge(state, action) {
      state.age = state.age + action.payload;
    },
    anotherFunction2() {},
  },
});

export let { changeName, changeAge } = user.actions;

export default user;
