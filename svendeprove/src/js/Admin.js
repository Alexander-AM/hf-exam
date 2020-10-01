import React from "react";
import { Redirect } from "react-router-dom";
import Container from "./Container";
import Popup from "./Popup";
import Form from "./Form";
import FormElement from "./FormElement";
import { ENDPOINT } from "./Global";

import "../css/Admin.css";

class Admin extends React.Component {
    constructor() {
        super();
        this.admin = document.cookie
            .split("; ")
            .find((row) => row.startsWith("admin="));
        if (this.admin !== undefined) {
            this.admin = this.admin.split("=")[1];
        }

        this.state = {
            animals: [],
            assets: [],
            volunteers: [],
            abouts: [],
            popup: { title: "", children: <></>, visible: false },
        };
        this.abortController = new AbortController();
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    componentDidMount() {
        // GET About
        fetch(`${ENDPOINT}/api/v1/abouts`, {
            signal: this.abortController.signal,
        })
            .then((e) => e.json())
            .then((data) => {
                this.setState({ abouts: data });
            });

        // GET Volunteers
        fetch(`${ENDPOINT}/api/v1/volunteers`, {
            signal: this.abortController.signal,
        })
            .then((e) => e.json())
            .then((data) => {
                this.setState({ volunteers: data });
            });

        // GET Animals
        fetch(`${ENDPOINT}/api/v1/animals`, {
            signal: this.abortController.signal,
        })
            .then((e) => e.json())
            .then((data) => {
                this.setState({ animals: data });
            });

        // GET Assets
        fetch(`${ENDPOINT}/api/v1/assets`, {
            signal: this.abortController.signal,
        })
            .then((e) => e.json())
            .then((data) => {
                this.setState({ assets: data });
            });
    }

    render() {
        return this.admin === undefined ? (
            <Redirect to="/login" />
        ) : (
            <main className="admin">
                <Container>
                    <h1>Administrative CMS</h1>
                    <h2>Abouts</h2>
                    <section className="admin-section admin-about">
                        {this.state.abouts.map((about, i) => {
                            return (
                                <div className="admin-item" key={i}>
                                    {about.title}
                                </div>
                            );
                        })}

                        <button
                            className="admin-button"
                            onClick={() => {
                                this.setState({
                                    popup: {
                                        title: "Tilføj About",
                                        visible: true,
                                        children: (
                                            <Form
                                                onValid={async (data) => {
                                                    const fData = new FormData();
                                                    fData.append(
                                                        "title",
                                                        data.title
                                                    );
                                                    fData.append(
                                                        "content",
                                                        data.content.replace(
                                                            /\n/g,
                                                            "\\n"
                                                        )
                                                    );
                                                    console.log(
                                                        this.admin,
                                                        data.title,
                                                        data.content
                                                    );

                                                    await fetch(
                                                        `${ENDPOINT}/api/v1/abouts`,
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/x-www-form-urlencoded",
                                                                Authorization: `Bearer ${this.admin}`,
                                                            },
                                                            body: `title=${
                                                                data.title
                                                            }&content=${data.content.replace(
                                                                /\n/g,
                                                                "\\n"
                                                            )}`,
                                                        }
                                                    ).then((data) => {
                                                        console.log(data);
                                                    });

                                                    this.setState({
                                                        popup: {
                                                            visible: false,
                                                        },
                                                    });
                                                }}
                                                onCancel={() => {
                                                    this.setState({
                                                        popup: {
                                                            visible: false,
                                                        },
                                                    });
                                                }}
                                                submitLabel="Tilføj"
                                                cancelLabel="Luk"
                                            >
                                                <FormElement
                                                    type="text"
                                                    id="title"
                                                    label="Title"
                                                />

                                                <FormElement
                                                    type="textarea"
                                                    id="content"
                                                    label="Content"
                                                />
                                            </Form>
                                        ),
                                    },
                                });
                            }}
                        >
                            +
                        </button>
                    </section>

                    <h2>Volunteers</h2>
                    <section className="admin-section admin-animals">
                        {this.state.volunteers.map((volunteer, i) => {
                            return (
                                <div className="admin-item" key={i}>
                                    {volunteer.title}
                                </div>
                            );
                        })}

                        <button className="admin-button">+</button>
                    </section>

                    <h2>Animals</h2>
                    <section className="admin-section admin-animals">
                        {this.state.animals.map((animal, i) => {
                            return (
                                <div className="admin-item" key={i}>
                                    {animal.name}
                                </div>
                            );
                        })}

                        <button className="admin-button">+</button>
                    </section>

                    <h2>Assets</h2>
                    <section className="admin-section admin-assets">
                        {this.state.assets.map((asset, i) => {
                            return (
                                <div
                                    className="admin-item"
                                    style={{
                                        backgroundImage: `url(${asset.url})`,
                                    }}
                                    key={i}
                                ></div>
                            );
                        })}

                        <button className="admin-button">+</button>
                    </section>
                </Container>

                <Popup
                    title={this.state.popup.title}
                    visible={this.state.popup.visible}
                >
                    {this.state.popup.children}
                </Popup>
            </main>
        );
    }
}

export default Admin;
