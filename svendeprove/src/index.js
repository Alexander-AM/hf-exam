import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";
import Animal from "./js/Animal";
import Newsletter from "./js/Newsletter";
import Login from "./js/Login";
import Admin from "./js/Admin";
import Header from "./js/Header";
import Footer from "./js/Footer";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />

            <Switch>
                <Route path="/animal/:id">
                    <Animal />
                </Route>

                <Route path="/newsletter/:email">
                    <Newsletter />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/admin">
                    <Admin />
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
