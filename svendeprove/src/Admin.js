import React from "react";
import { ENDPOINT } from "./Global";
import { Redirect } from "react-router-dom";

import "./Admin.css";

const Admin = () => {
    const admin = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin="));

    return admin === undefined ? (
        <Redirect to="/login" />
    ) : (
        <main className="admin">
            <section></section>
        </main>
    );
};

export default Admin;
