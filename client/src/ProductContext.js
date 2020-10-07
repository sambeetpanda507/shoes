import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const initialState = {
    products: [],
    cart: [],
    error: false,
};

export const ACTIONS = {
    SET_INITIAL: "initial data",
    ADD: "add",
    REMOVE: "remove",
    INC: "increment",
    DEC: "decrement",
    UPDATE: "update_cart",
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_INITIAL:
            return {
                products: action.payload.products,
                cart: [],
                error: false,
            };
        case ACTIONS.ADD:
            return addToCart(state, action.payload.id);

        case ACTIONS.REMOVE:
            return removeFromCart(state, action.payload.id);

        case ACTIONS.INC:
            return incrementCount(state, action.payload.id);

        case ACTIONS.DEC:
            return decrementCount(state, action.payload.id);
        case ACTIONS.UPDATE:
            return updateCart(state);
        default:
            throw new Error();
    }
};

const addToCart = (state, id) => {
    let newItem = {};
    const item = state.products.filter((val) => {
        return val._id === id;
    });
    newItem = JSON.parse(JSON.stringify(item[0]));
    const isExist = state.cart.find((val) => {
        return val._id === id;
    });

    if (isExist) {
        return { ...state, error: true };
    }

    return { ...state, cart: [...state.cart, newItem], error: false };
};

const removeFromCart = (state, id) => {
    let item = [];
    state.cart.forEach((val) => {
        if (val._id !== id) {
            item.push(val);
        }
    });
    return { ...state, cart: item };
};

const incrementCount = (state, id) => {
    let newItem = [];
    state.cart.forEach((val) => {
        if (val._id === id) {
            val.count += 1;
            newItem.push(val);
        } else {
            newItem.push(val);
        }
    });
    return {
        ...state,
        cart: newItem,
    };
};

const decrementCount = (state, id) => {
    let newItem = [];
    state.cart.forEach((val) => {
        if (val._id === id) {
            val.count === 1 ? (val.count = 1) : (val.count -= 1);
            newItem.push(val);
        } else {
            newItem.push(val);
        }
    });

    return {
        ...state,
        cart: newItem,
    };
};

const updateCart = (state) => {
    return {
        ...state,
        cart: [],
    };
};

export const ProductProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/products")
            .then((products) => {
                dispatch({
                    type: ACTIONS.SET_INITIAL,
                    payload: { products: products.data.products },
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ProductContext.Provider value={[state, dispatch]}>
            {props.children}
        </ProductContext.Provider>
    );
};
