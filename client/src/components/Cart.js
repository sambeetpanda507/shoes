import React, { useContext } from "react";
import { ProductContext } from "../ProductContext";
import { motion } from "framer-motion";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import Button from "@material-ui/core/Button";

const productVariant = {
  hidden: {
    x: "200vw",
  },
  visible: {
    x: 0,
    transition: { delay: 0.7, type: "spring", stiffness: 50 },
  },
  exit: {
    y: "200vw",
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

const cartIconVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.8 },
  },
  exit: {
    opactiy: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export const Cart = () => {
  const products = useContext(ProductContext);

  let totalPrice = products.shoes.cart.reduce(
    (acc, currVal) => acc + currVal.price * currVal.count,
    0
  );

  // const countChanger = () => {
  //   setIinitialCount([...initialCount, "a"]);
  // };

  const removeHandler = (e) => {
    products.removeFromCart(e.target.id);
  };
  return (
    <div className="container">
      {products.shoes.cart.length <= 0 && (
        <motion.div
          className="text-center mt-5"
          variants={cartIconVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <LocalMallIcon
            fontSize="large"
            className="text-secondary"
            style={{ fontSize: "7rem" }}
          />
          <p className="text-secondary">Cart Empty</p>
        </motion.div>
      )}
      {products.shoes.cart.map((shoes) => {
        return (
          <motion.div
            key={shoes._id}
            className="row bg-white p-3 m-2"
            variants={productVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="col-md-4">
              <div className="cart__img">
                <img src={shoes.img} alt="shoe img" className="img-thumbnail" />
              </div>
            </div>
            <div className="col-md-8 cart__details p-3">
              <div className="ml-4">
                <h5
                  style={{
                    textDecoration: "line-through",
                  }}
                >
                  M.R.P :<span>₹ {shoes.mrp}</span>
                </h5>
                <h5>
                  Price :<span className="text-danger">₹ {shoes.price}</span>
                </h5>
                <h5>
                  You save :<span className="text-danger">₹ {shoes.save}</span>
                </h5>
                <div>
                  <button
                    className="btn btn-sm btn-outline-success font-weight-bold"
                    id={shoes._id}
                    onClick={(e) => {
                      products.removeHandler(e.target.id);
                      // countChanger();
                    }}
                  >
                    -
                  </button>
                  <span className="border border-danger p-1 ml-1 mr-1">
                    {shoes.count}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-success font-weight-bold"
                    id={shoes._id}
                    onClick={(e) => {
                      products.addHandler(e.target.id);
                      // countChanger();
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-danger btn-sm mt-1"
                  id={shoes._id}
                  onClick={removeHandler}
                >
                  remove from cart
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
      {products.shoes.cart.length > 0 && (
        <motion.div
          className="row d-flex justify-content-around align-items-center my-3 text-center"
          variants={productVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h3>
            Total price: <span className="text-danger">₹{totalPrice}</span>
          </h3>
          <Button variant="contained" color="primary" size="large">
            Payment
          </Button>
        </motion.div>
      )}
    </div>
  );
};
