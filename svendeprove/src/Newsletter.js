import React from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";
import Form from "./Form";
import { ENDPOINT } from "./Global";
import FormElement from "./FormElement";

import "./Newsletter.css";

const Newsletter = () => {
    const { email } = useParams();

    return (
        <main className="newsletter">
            <h1>Du er nu tilmeldt vores newsletter.</h1>
            <Container>
                <Form
                    onValid={(data) => {
                        fetch(`${ENDPOINT}/api/v1/subscribers/${data.email}`, {
                            method: "DELETE",
                        });
                    }}
                    submitLabel="Afmeld"
                >
                    <h2>Ikke intereseret?</h2>

                    <FormElement
                        type="text"
                        id="email"
                        label="Email"
                        default={decodeURIComponent(email)}
                    />
                </Form>
            </Container>
        </main>
    );
};

export default Newsletter;
