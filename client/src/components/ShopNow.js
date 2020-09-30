import React, { useContext, useState } from "react";
import "./css/shop.css";
import { Product } from "./Product";
import { motion } from "framer-motion";
import { ProductContext } from "../ProductContext";

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

export const ShopNow = (props) => {
  const [initial, setInitial] = useState({ opacity: 0, x: "200vw" });

  const [state, dispatch] = useContext(ProductContext);

  const addAnimation = () => {
    setInitial({
      opacity: 1,
      x: 0,
      transition: { duration: 1, type: "spring" },
    });
    setTimeout(() => {
      setInitial({
        opacity: 0,
        x: "200vw",
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }, 1500);
  };

  return (
    <div className="shop container my-4 p-3">
      <div className="row">
        <motion.div
          initial={{ opacity: 0, x: "200vw" }}
          animate={initial}
          className="shop__added"
        >
          {state.error ? "Already added !!!" : "Added to cart"}
        </motion.div>
        {state.products.map((items) => {
          return (
            <motion.div
              key={items._id}
              variants={productVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 d-flex justify-content-center my-3"
            >
              <Product
                _id={items._id}
                img={items.img}
                title={items.title}
                count={items.count}
                mrp={items.mrp}
                price={items.price}
                save={items.save}
                addAnimation={addAnimation}
                history={props.history}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
