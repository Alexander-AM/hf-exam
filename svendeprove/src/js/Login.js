import React, { useState } from "react";
import Form from "./Form";
import FormElement from "./FormElement";
import Container from "./Container";
import { Redirect } from "react-router-dom";
import { ENDPOINT } from "./Global";

import "../css/Login.css";

const Login = () => {
    const [admin, setAdmin] = useState(
        document.cookie.split("; ").find((row) => row.startsWith("admin="))
    );

    return admin !== undefined ? (
        <Redirect to="/admin" />
    ) : (
        <main className="login">
            <h1 className="title">Admin Login</h1>

            <Container>
                <Form
                    onValid={async (data) => {
                        const fData = new FormData();
                        fData.append("username", data.username);
                        fData.append("password", data.password);

                        await fetch(`${ENDPOINT}/auth/token`, {
                            method: "POST",
                            body: fData,
                        })
                            .then((e) => e.json())
                            .then((data) => {
                                document.cookie = `admin=${
                                    data.token
                                }; expires=${new Date(
                                    data.expires
                                ).toUTCString()}`;

                                setAdmin(
                                    document.cookie
                                        .split("; ")
                                        .find((row) => row.startsWith("admin="))
                                );
                            });
                    }}
                    submitLabel="Log ind"
                >
                    <FormElement
                        type="text"
                        id="username"
                        label="Username"
                        required
                    />
                    <FormElement
                        type="password"
                        id="password"
                        label="Password"
                        required
                    />
                </Form>
            </Container>
        </main>
    );
};

export default Login;
