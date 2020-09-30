import React, { useContext } from "react";
import * as Bootstrap from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { ProductContext, ACTIONS } from "../ProductContext";
import { Link } from "react-router-dom";

export const Product = ({
  _id,
  img,
  title,
  mrp,
  price,
  save,
  addAnimation,
  history,
}) => {
  const [state, dispatch] = useContext(ProductContext);

  return (
    <Bootstrap.Card style={{ width: "18rem" }} className="shop__card">
      <Bootstrap.Card.Img variant="top" src={img} />
      <Bootstrap.Card.Body>
        <Bootstrap.Card.Title>{title}</Bootstrap.Card.Title>

        <p
          style={{
            lineHeight: "5px",
            textDecoration: "line-through",
          }}
        >
          M.R.P :<span>₹ {mrp}</span>
        </p>
        <p style={{ lineHeight: "5px" }}>
          Price :<span className="text-danger">₹ {price}</span>
        </p>
        <p style={{ lineHeight: "5px" }}>
          You save :<span className="text-danger">₹ {save}</span>
        </p>

        <Link to={`/details/${_id}`}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ outline: "none" }}
            size="small"
          >
            Get Details
          </Button>
        </Link>
        <Button
          variant="outlined"
          color="primary"
          style={{ outline: "none" }}
          className="ml-2"
          size="small"
          onClick={() => {
            addAnimation();
            dispatch({
              type: ACTIONS.ADD,
              payload: { id: _id },
            });
          }}
        >
          Add to cart
        </Button>
      </Bootstrap.Card.Body>
    </Bootstrap.Card>
  );
};
