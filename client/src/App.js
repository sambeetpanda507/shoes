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
          </Switch>
        </AnimatePresence>
      </ProductProvider>
    </div>
  );
};
