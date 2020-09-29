import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Header from "./Header";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />

            <Switch>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
