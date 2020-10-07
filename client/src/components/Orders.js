import React, { useState, useEffect } from "react";
import * as Bootstrap from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "../axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const tableVariant = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 1, duration: 0.5 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

function Orders() {
    const [orders, setOrders] = useState([]);
    let user = null;
    if (window.localStorage.getItem("user")) {
        user = JSON.parse(window.localStorage.getItem("user"));
    }
    useEffect(() => {
        if (user) {
            axios({
                url: "/getOrders",
                method: "POST",
                data: { email: user.email },
            })
                .then((result) => {
                    // console.log("order.js : ", result);
                    setOrders(result.data.orders);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <motion.div
            variants={tableVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="container mt-3"
            style={{ overflowY: "scroll" }}
        >
            {orders.length <= 0 ? (
                <div className="text-center p-3">
                    <CircularProgress />
                    <h4 className="text-secondary">Login to check orders</h4>
                </div>
            ) : (
                <div>
                    {orders.map((value, index) => {
                        return (
                            <div key={value._id} className="my-2">
                                <u>
                                    <h6>
                                        {index + 1}. Order Id: {value._id}
                                    </h6>
                                </u>
                                <Bootstrap.Table
                                    striped
                                    bordered
                                    hover
                                    size="sm"
                                >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Count</th>
                                            <th>M.R.P</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.cart.map((items, ind) => {
                                            return (
                                                <tr key={items._id}>
                                                    <td>{ind + 1}</td>
                                                    <td>{items.title}</td>
                                                    <td>{items.count}</td>
                                                    <td>₹{items.mrp}</td>
                                                    <td>₹{items.price}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Bootstrap.Table>
                            </div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}

export default Orders;
