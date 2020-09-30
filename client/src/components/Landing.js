import React from "react";
import "./css/landing.css";
import Shoe from "../images/Shoes.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const landingVariant = {
  hidden: {
    opacity: 0,
    x: "-200vw",
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    x: "-200vw",
    opacity: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const imageVariant = {
  hidden: {
    x: "200vw",
  },
  visible: {
    x: 0,
    transition: { delay: 0.2, type: "spring", stiffness: 50 },
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

export const Landing = () => {
  return (
    <div className="landing container">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="landing__text text-center">
            <motion.h1
              variants={landingVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
              exit="exit"
            >
              RUN FASTER
            </motion.h1>
            <motion.h4
              variants={landingVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7, type: "spring", stiffness: 50 }}
              exit="exit"
            >
              Made for high speed running
            </motion.h4>
            <div className="landing__buttons">
              <Link to="/shop">
                <motion.button
                  className="btn btn-success btn lg mt-2 mr-2"
                  variants={landingVariant}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 1.3, type: "spring", stiffness: 50 }}
                  exit="exit"
                >
                  Shop Now
                </motion.button>
              </Link>
              <motion.button
                className="btn btn-outline-success btn lg mt-2 ml-2"
                variants={landingVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.3, type: "spring", stiffness: 50 }}
                exit="exit"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <motion.img
            src={Shoe}
            alt="shoe"
            className="img-fluid"
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        </div>
      </div>
    </div>
  );
};
