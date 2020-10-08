import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import * as Bootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/signin.css";
import axios from "../axios";
import Error from "./Error";

const productVariant = {
    hidden: {
        x: "100vw",
    },
    visible: {
        x: 0,
        transition: { delay: 1, type: "spring", stiffness: 100 },
    },
    exit: {
        x: "-100vw",
        opacity: 0,
        transition: {
            ease: "easeInOut",
            duration: 1,
        },
    },
};

function Reset(props) {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const token = props.match.params.token;

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value);
        } else if (name === "email") {
            setEmail(value);
        }
        setError(null);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (email && password) {
            patchResetPassword();
        }
    };

    const patchResetPassword = () => {
        axios({
            url: `/reset/${token}`,
            method: "PATCH",
            data: { email: email, password: password },
        })
            .then((result) => {
                props.history.replace("/signin");
            })
            .catch((error) => {
                setError(error);
            });
    };

    return (
        <motion.div
            variants={productVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="signin"
        >
            <div className="signin__body container">
                {error ? <Error className="my-3" error={error} /> : null}
                <div className="signin__form mt-5 p-lg-5 p-xl-5 p-3">
                    <Bootstrap.Form onSubmit={onSubmitHandler}>
                        <Bootstrap.Form.Group controlId="formBasicEmail">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="standard"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                value={email}
                                onChange={onChangeHandler}
                            />
                            <Bootstrap.Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Bootstrap.Form.Text>
                        </Bootstrap.Form.Group>

                        <Bootstrap.Form.Group controlId="formBasicPassword">
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="standard"
                                name="password"
                                type="password"
                                required
                                fullWidth
                                value={password}
                                onChange={onChangeHandler}
                            />
                            <Bootstrap.Form.Text className="text-muted">
                                Password must be atleast 6 characters long.
                                Already have an account?{" "}
                                <Link to="/signin">Signin.</Link>
                            </Bootstrap.Form.Text>
                        </Bootstrap.Form.Group>

                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                        >
                            Reset Password
                        </Button>
                    </Bootstrap.Form>
                </div>
            </div>
        </motion.div>
    );
}

export default Reset;
