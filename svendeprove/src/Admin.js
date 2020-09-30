import React from "react";
import { Redirect } from "react-router-dom";

const Admin = () => {
    const adminToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("admin="));

    return adminToken === undefined ? <Redirect to="/login" /> : <main></main>;
};

export default Admin;
