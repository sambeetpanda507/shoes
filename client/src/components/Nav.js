import React, { useContext } from "react";
import * as Bootstrap from "react-bootstrap";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./css/nav.css";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
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
    const [state, dispatch] = useContext(ProductContext);
    const path = useLocation().pathname;
    const loggedInUser = window.localStorage.getItem("user");
    const logoutHandler = (e) => {
        e.preventDefault();
        window.localStorage.removeItem("user");
        window.location.replace("/");
    };
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
                        className={
                            path === "/"
                                ? "bg-success text-white"
                                : "text-success"
                        }
                    >
                        <Link
                            to="/"
                            className={
                                path === "/"
                                    ? "nav__link p-2 text-white"
                                    : "nav__link p-2 text-success"
                            }
                        >
                            HOME
                        </Link>
                    </motion.span>
                    <motion.span
                        variants={linkVariant}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={
                            path === "/orders"
                                ? "bg-success text-white"
                                : "text-success"
                        }
                    >
                        <Link
                            to="/orders"
                            className={
                                path === "/orders"
                                    ? "nav__link p-2 text-white"
                                    : "nav__link p-2 text-success"
                            }
                        >
                            ORDERS
                        </Link>
                    </motion.span>
                    <motion.span
                        variants={linkVariant}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={
                            path === "/signin"
                                ? "bg-success text-white"
                                : "text-success"
                        }
                    >
                        {loggedInUser ? (
                            <Link
                                to="/logout"
                                className="nav__link p-2 text-success"
                                onClick={logoutHandler}
                            >
                                LOGOUT
                            </Link>
                        ) : (
                            <Link
                                to="/signin"
                                className={
                                    path === "/signin"
                                        ? "nav__link p-2 text-white"
                                        : "nav__link p-2 text-success"
                                }
                            >
                                SIGN IN
                            </Link>
                        )}
                    </motion.span>
                    <motion.span
                        i
                        variants={linkVariant}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                    >
                        <Link to="/cart" className="nav__link p-2">
                            <Badge
                                color="error"
                                badgeContent={state.cart.length}
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                    </motion.span>
                </Bootstrap.Nav>
            </Bootstrap.Navbar.Collapse>
        </Bootstrap.Navbar>
    );
};
