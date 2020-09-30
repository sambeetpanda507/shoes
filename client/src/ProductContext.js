import React, { createContext, useReducer } from "react";

export const ProductContext = createContext();

const initialState = {
  products: [
    {
      _id: 100,
      img:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      title: "Nike Shoes",
      count: 1,
      mrp: 1000,
      price: 800,
      save: "200(20%)",
    },
    {
      _id: 101,
      img:
        "https://5.imimg.com/data5/UP/DR/WO/SELLER-10420561/nike-air-max-270-sports-running-shoes-500x500.jpeg",
      title: "Nike Shoes",
      count: 1,
      mrp: 1000,
      price: 800,
      save: "200(20%)",
    },
    {
      _id: 102,
      img:
        "https://5.imimg.com/data5/YK/BX/MY-10420561/nike-air-max-270-sports-running-shoes-500x500.jpeg",
      title: "Nike Shoes",
      count: 1,
      mrp: 1000,
      price: 800,
      save: "200(20%)",
    },
    {
      _id: 103,
      img:
        "https://4.imimg.com/data4/RE/BI/ANDROID-41682785/product-500x500.jpeg",
      title: "Nike Shoes",
      count: 1,
      mrp: 1000,
      price: 800,
      save: "200(20%)",
    },
    {
      _id: 104,
      img:
        "https://i.pinimg.com/originals/00/bc/06/00bc06da4b8e11ece2b21152967259cc.jpg",
      title: "Nike Shoes",
      count: 1,
      mrp: 1000,
      price: 800,
      save: "200(20%)",
    },
    {
      _id: 105,
      img:
        "https://scstylecaster.files.wordpress.com/2020/05/5-converse-high-top.jpg?w=500&h=334",
      title: "Nike Shoes",
      count: 1,
      mrp: 1000,
      price: 800,
      save: "200(20%)",
    },
  ],
  cart: [],
  error: false,
};

export const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  INC: "increment",
  DEC: "decrement",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return addToCart(state, action.payload.id);

    case ACTIONS.REMOVE:
      return removeFromCart(state, action.payload.id);

    case ACTIONS.INC:
      return incrementCount(state, action.payload.id);

    case ACTIONS.DEC:
      return decrementCount(state, action.payload.id);

    default:
      throw new Error();
  }
};

const addToCart = (state, id) => {
  let newItem = {};
  const item = state.products.filter((val) => {
    return Number(val._id) === Number(id);
  });
  newItem = JSON.parse(JSON.stringify(item[0]));
  const isExist = state.cart.find((val) => {
    return Number(val._id) === Number(id);
  });

  if (isExist) {
    return { ...state, error: true };
  }

  return { ...state, cart: [...state.cart, newItem], error: false };
};

const removeFromCart = (state, id) => {
  let item = [];
  state.cart.forEach((val) => {
    if (Number(val._id) !== Number(id)) {
      item.push(val);
    }
  });
  return { ...state, cart: item };
};

const incrementCount = (state, id) => {
  let newItem = [];
  state.cart.forEach((val) => {
    if (Number(val._id) === Number(id)) {
      val.count += 1;
      newItem.push(val);
    } else {
      newItem.push(val);
    }
  });
  return {
    ...state,
    cart: newItem,
  };
};

const decrementCount = (state, id) => {
  let newItem = [];
  state.cart.forEach((val) => {
    if (Number(val._id) === Number(id)) {
      val.count === 1 ? (val.count = 1) : (val.count -= 1);
      newItem.push(val);
    } else {
      newItem.push(val);
    }
  });

  return {
    ...state,
    cart: newItem,
  };
};

export const ProductProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={[state, dispatch]}>
      {props.children}
    </ProductContext.Provider>
  );
};
