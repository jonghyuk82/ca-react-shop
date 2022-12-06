import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

// createSlice({
//     name: 'state이름',
//     initialState: '값'
// })

// let user = createSlice({
//   name: "user",
//   initialState: { name: "Lee", age: 40 },
//   reducers: {
//     // changeName(state) {
//     //   return "john " + state;
//     // },
//     // changeName(state) {
//     //   return { name: "Park", age: 40 };
//     // },
//     // or
//     changeName(state) {
//       state.name = "Park";
//     },
//     changeAge(state, action) {
//       state.age = state.age + action.payload;
//     },
//     anotherFunction2() {},
//   },
// });

// export let { changeName, changeAge } = user.actions;

// let stock = createSlice({
//   name: "stock",
//   initialState: [10, 11, 12],
// });

let cartItem = createSlice({
  name: "cartItem",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let num = state.findIndex((x) => x.id === action.payload);
      //   console.log(num);
      //   console.log(state[num].count);
      state[num].count += 1;
      //   console.log(state[num].count);
    },
    addToCart(state, action) {
      //   console.log(action.payload);
      let items = state.find((x) => x.id === action.payload.item.id);
      //   console.log(items);
      //   console.log(action.payload.item.id);
      //   console.log(action.payload.num);

      //   console.log(typeof action.payload.num);
      if (items === undefined) {
        let data = {
          id: action.payload.item.id,
          name: action.payload.item.title,
          count: parseInt(action.payload.num),
        };
        state.push(data);
      } else {
        items.count += 1;
      }
    },
    removeFromCart(state, action) {
      //   console.log(action.payload);
      return state.filter((x) => x.id !== action.payload);
    },
  },
});

export let { addCount, addToCart, removeFromCart } = cartItem.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    // stock: stock.reducer,
    cartItem: cartItem.reducer,
  },
});
