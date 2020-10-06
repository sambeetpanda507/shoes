import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
import * as Bootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/signin.css";
import axios from "../axios";
import Error from "./Error";
import { Alert, AlertTitle } from "@material-ui/lab";

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

function Forgot(props) {
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);

    const [success, setSuccess] = useState(null);

    const [progress, setProgress] = useState(null);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        }
        setError(null);
        setSuccess(null);
    };

    const onForgotHandler = (e) => {
        e.preventDefault();
        axios({
            url: "/forgot",
            method: "POST",
            data: { email: email },
            onDownloadProgress: (progressEvent) => {
                setProgress(
                    Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    )
                );
            },
        })
            .then((result) => {
                setSuccess(`check ${email} to reset your password`);
                setError(null);
            })
            .catch((err) => {
                setSuccess(null);
                setError(err);
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
            <Bootstrap.ProgressBar
                animated
                now={progress}
                style={{ height: "2px" }}
                className="mb-3"
            />
            <div className="signin__body container">
                {error ? (
                    <Error className="my-3" error={error} success={success} />
                ) : null}

                {success ? (
                    <div>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {success} — <strong>check it out!</strong>
                        </Alert>
                    </div>
                ) : null}
                <div className="signin__form mt-5 p-3">
                    <Bootstrap.Form
                        autoComplete="off"
                        onSubmit={onForgotHandler}
                    >
                        <Bootstrap.Form.Group controlId="formBasicEmail">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="standard"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                color="primary"
                                value={email}
                                onChange={onChangeHandler}
                            />
                            <Bootstrap.Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                Already have an account?{" "}
                                <Link to="/signin">Signin.</Link> Don't have an
                                account? <Link to="/signup">SignUp.</Link>
                            </Bootstrap.Form.Text>
                        </Bootstrap.Form.Group>
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                        >
                            Reset
                        </Button>
                    </Bootstrap.Form>
                </div>
            </div>
        </motion.div>
    );
}

export default Forgot;
