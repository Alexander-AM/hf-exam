import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Animal from "./Animal";
import Newsletter from "./Newsletter";
import Header from "./Header";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "./Footer";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />

            <Switch>
                <Route path="/animal/:id">
                    <Animal />
                </Route>

                <Route path="/newsletter">
                    <Newsletter />
                </Route>

                <Route path="/">
                    <App />
                </Route>
            </Switch>

            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
