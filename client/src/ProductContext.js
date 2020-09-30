import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [shoes, setShoes] = useState({
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
  });

  const addToCart = (id) => {
    const item = shoes.products.filter((shoe) => {
      return Number(shoe._id) === Number(id);
    });

    const isExist = shoes.cart.filter((data) => {
      return data._id === item[0]._id;
    });
    if (isExist.length > 0) {
      setShoes({ ...shoes, error: true });
    } else {
      setShoes({ ...shoes, cart: [...shoes.cart, item[0]], error: false });
    }
  };

  const removeFromCart = (id) => {
    const cartAfterRemove = shoes.cart.filter((items) => {
      return Number(items._id) !== Number(id);
    });
    setShoes({ ...shoes, cart: cartAfterRemove });
  };

  const addHandler = (id) => {
    const { cart } = shoes;
    cart.forEach((item) => {
      if (Number(item._id) === Number(id)) {
        item.count += 1;
      }
    });
    setShoes({ ...shoes, cart: cart });
  };

  const removeHandler = (id) => {
    const { cart } = shoes;
    cart.forEach((item) => {
      if (Number(item._id) === Number(id)) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setShoes({ ...shoes, cart: cart });
  };

  return (
    <ProductContext.Provider
      value={{
        shoes: shoes,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        addHandler: addHandler,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
