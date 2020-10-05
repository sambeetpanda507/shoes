import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function TransitionAlerts(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {props.error.response.data.message} —{" "}
                    <strong>check it out!</strong>
                </Alert>
            </Collapse>
        </div>
    );
}
