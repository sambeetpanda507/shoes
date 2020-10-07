import React, { useContext } from "react";
import { ProductContext, ACTIONS } from "../ProductContext";
import { motion } from "framer-motion";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import Button from "@material-ui/core/Button";
import axios from "../axios";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

// toast.configure();

export const Cart = () => {
    const [state, dispatch] = useContext(ProductContext);

    let totalPrice = state.cart.reduce(
        (acc, currVal) => acc + currVal.price * currVal.count,
        0
    );

    const handleToken = (token, addresses) => {
        console.log({ token, addresses });
        axios({
            url: "/checkout",
            method: "POST",
            data: { token: token, totalPrice: totalPrice },
        })
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Payment Successfull ✔", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch({
                        type: ACTIONS.UPDATE,
                    });
                }
            })
            .catch((err) => {
                toast.error("Payment Unsuccessfull ✖", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const removeNotifier = () => {
        toast("Item removed ✖", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="container">
            {state.cart.length <= 0 && (
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
            <div>
                <ToastContainer />
            </div>
            {state.cart.map((shoes) => {
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
                                <img
                                    src={shoes.img}
                                    alt="shoe img"
                                    className="img-thumbnail"
                                />
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
                                    Price :
                                    <span className="text-danger">
                                        ₹ {shoes.price}
                                    </span>
                                </h5>
                                <h5>
                                    You save :
                                    <span className="text-danger">
                                        ₹ {shoes.save}
                                    </span>
                                </h5>
                                <div>
                                    <button
                                        className="btn btn-sm btn-outline-success font-weight-bold"
                                        onClick={(e) => {
                                            dispatch({
                                                type: ACTIONS.DEC,
                                                payload: { id: shoes._id },
                                            });
                                        }}
                                    >
                                        -
                                    </button>
                                    <span className="border border-danger p-1 ml-1 mr-1">
                                        {shoes.count}
                                    </span>
                                    <button
                                        className="btn btn-sm btn-outline-success font-weight-bold"
                                        onClick={(e) => {
                                            dispatch({
                                                type: ACTIONS.INC,
                                                payload: { id: shoes._id },
                                            });
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="btn btn-danger btn-sm mt-1"
                                    onClick={() => {
                                        removeNotifier();
                                        dispatch({
                                            type: ACTIONS.REMOVE,
                                            payload: { id: shoes._id },
                                        });
                                    }}
                                >
                                    remove from cart
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
            {state.cart.length > 0 && (
                <motion.div
                    className="row d-flex justify-content-around align-items-center my-3 text-center"
                    variants={productVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <h3>
                        Total price:{" "}
                        <span className="text-danger">₹{totalPrice}</span>
                    </h3>
                    <StripeCheckout
                        stripeKey="pk_test_51H3cHQDYcjXcA8R7PYh0WLfp6h8C8RvUCIuYQwF7vZFoG2cdHuXKX17RtJMZUzl3dPesYuUcijgr2IPBSWT1VRZH005W6kZQTj"
                        token={handleToken}
                        billingAddress
                        shippingAddress
                        currency="INR"
                        amount={totalPrice * 100}
                    />
                </motion.div>
            )}
        </div>
    );
};
