import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import * as Bootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/signin.css";
import axios from "axios";

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

function Signup(props) {
    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "name") {
            setName(value);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (email && name && password) {
            postSignup();
        }
    };

    const postSignup = () => {
        axios({
            url: "http://localhost:8080/api/signup",
            method: "POST",
            data: { name: name, email: email, password: password },
        })
            .then((result) => {
                if (result.status === 201) {
                    props.history.push("/signin");
                }
            })
            .catch((error) => console.log(error));
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
                <div className="signin__form mt-5 p-lg-5 p-xl-5 p-3">
                    <Bootstrap.Form onSubmit={onSubmitHandler}>
                        <Bootstrap.Form.Group controlId="formBasicEmail">
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="standard"
                                name="name"
                                type="text"
                                required
                                fullWidth
                                value={name}
                                onChange={onChangeHandler}
                            />
                        </Bootstrap.Form.Group>
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
                                type="text"
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
                            Signup
                        </Button>
                    </Bootstrap.Form>
                </div>
            </div>
        </motion.div>
    );
}

export default Signup;
