import React, { useContext, useState } from "react";
import { ProductContext, ACTIONS } from "../ProductContext";
import * as Bootstrap from "react-bootstrap";
import "./css/shop.css";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: {
    opacity: 0,
    y: "-100vw",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1, duration: 0.7, type: "spring", stiffness: 80 },
  },
  exit: {
    x: "-200vw",
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export const GetDetails = (props) => {
  const [initial, setInitial] = useState({ opacity: 0, x: "-200vw" });

  const [state, dispatch] = useContext(ProductContext);

  const shoe = state.products.filter((item) => {
    return Number(item._id) === Number(props.match.params.id);
  });

  const addAnimation = () => {
    setInitial({
      opacity: 1,
      x: 0,
      transition: { duration: 1, type: "spring" },
    });
    setTimeout(() => {
      setInitial({
        opacity: 0,
        x: "-200vw",
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    }, 1500);
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="details d-flex justify-content-center align-items-center p-1"
    >
      <motion.div
        initial={{ opacity: 0, x: "-200vw" }}
        animate={initial}
        className="details__added"
      >
        {state.error ? "Already added !!!" : "Added to cart"}
      </motion.div>
      <Bootstrap.Card style={{ width: "18rem" }} className="shop__card">
        <Bootstrap.Card.Img variant="top" src={shoe[0].img} />
        <Bootstrap.Card.Body>
          <Bootstrap.Card.Title>{shoe[0].title}</Bootstrap.Card.Title>
          <p
            style={{
              lineHeight: "5px",
              textDecoration: "line-through",
            }}
          >
            M.R.P :<span>₹ {shoe[0].mrp}</span>
          </p>
          <p style={{ lineHeight: "5px" }}>
            Price :<span className="text-danger">₹ {shoe[0].price}</span>
          </p>
          <p style={{ lineHeight: "5px" }}>
            You save :<span className="text-danger">₹ {shoe[0].save}</span>
          </p>
          <Bootstrap.Card.Text>
            Nike was founded in 1964 as Blue Ribbon Sports by Bill Bowerman, a
            track-and-field coach at the University of Oregon, and his former
            student Phil Knight.
          </Bootstrap.Card.Text>
          <Button
            variant="contained"
            color="primary"
            className="btn-block"
            onClick={() => {
              addAnimation();
              dispatch({
                type: ACTIONS.ADD,
                payload: { id: props.match.params.id },
              });
            }}
          >
            Add to cart
          </Button>
        </Bootstrap.Card.Body>
      </Bootstrap.Card>
    </motion.div>
  );
};
