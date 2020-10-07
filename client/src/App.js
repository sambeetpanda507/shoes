import React from "react";
import { Nav } from "./components/Nav";
import { Landing } from "./components/Landing";
import "bootstrap/dist/css/bootstrap.css";
import "./app.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { ShopNow } from "./components/ShopNow";
import { AnimatePresence } from "framer-motion";
import { ProductProvider } from "./ProductContext";
import { GetDetails } from "./components/GetDetails";
import { Cart } from "./components/Cart";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";
import Orders from "./components/Orders";
export const App = () => {
    const location = useLocation();
    return (
        <div className="app">
            <ProductProvider>
                <Nav />
                <AnimatePresence>
                    <Switch location={location} key={location.key}>
                        <Route path="/" exact component={Landing} />
                        <Route path="/shop" component={ShopNow} />
                        <Route path="/details/:id" component={GetDetails} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/forgot" component={Forgot} />
                        <Route path="/reset/:token" component={Reset} />
                        <Route path="/orders" component={Orders} />
                    </Switch>
                </AnimatePresence>
            </ProductProvider>
        </div>
    );
};
