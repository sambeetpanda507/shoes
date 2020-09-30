import React, { useContext } from "react";
import * as Bootstrap from "react-bootstrap";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./css/nav.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProductContext } from "../ProductContext";

const linkVariant = {
  hidden: {
    opacity: 0,
    y: "-200px",
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  hover: {
    scale: 1.2,
    transition: { type: "spring", stiffness: 1000 },
  },
};

export const Nav = () => {
  const product = useContext(ProductContext);
  return (
    <Bootstrap.Navbar collapseOnSelect className="nav__bg pt-3">
      <Bootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Bootstrap.Navbar.Collapse id="responsive-navbar-nav">
        <Bootstrap.Nav className="ml-auto mr-auto">
          <motion.span
            variants={linkVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/" className="nav__link p-2">
              HOME
            </Link>
          </motion.span>
          <motion.span
            variants={linkVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/orders" className="nav__link p-2">
              ORDERS
            </Link>
          </motion.span>
          <motion.span
            variants={linkVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/signin" className="nav__link p-2">
              SIGN IN
            </Link>
          </motion.span>
          <motion.span
            i
            variants={linkVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Link to="/cart" className="nav__link p-2">
              <Badge color="error" badgeContent={product.shoes.cart.length}>
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </motion.span>
        </Bootstrap.Nav>
      </Bootstrap.Navbar.Collapse>
    </Bootstrap.Navbar>
  );
};
