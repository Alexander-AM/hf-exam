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
            adoptsections: [],
            popup: { title: "", children: <></>, visible: false },
        };
        this.abortController = new AbortController();
    }

    convertdata(data) {
        let fData = "";
        Object.entries(data).forEach((entry) => {
            fData += `${fData ? "&" : ""}${encodeURIComponent(
                entry[0]
            )}=${encodeURIComponent(entry[1])}`;
        });
        return fData;
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    componentDidMount() {
        // GET Adoptsections
        fetch(`${ENDPOINT}/api/v1/adoptsections`, {
            signal: this.abortController.signal,
        })
            .then((e) => e.json())
            .then((data) => {
                this.setState({ adoptsections: data });
            });

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
                    <h1>Content Management System</h1>
                    <h2>Sections</h2>
                    <section className="admin-section admin-sections">
                        {this.state.adoptsections.map((section, i) => {
                            return (
                                <div
                                    className="admin-item"
                                    key={i}
                                    onClick={() => {
                                        this.setState({
                                            popup: {
                                                title: `Modificer "${section.title}"`,
                                                visible: true,
                                                children: (
                                                    <Form
                                                        onValid={async (
                                                            data
                                                        ) => {
                                                            await fetch(
                                                                `${ENDPOINT}/api/v1/abouts/${section.id}`,
                                                                {
                                                                    method:
                                                                        "PUT",
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/x-www-form-urlencoded",
                                                                        Authorization: `Bearer ${this.admin}`,
                                                                    },
                                                                    body: this.convertdata(
                                                                        data
                                                                    ),
                                                                }
                                                            )
                                                                .then((e) =>
                                                                    e.json()
                                                                )
                                                                .then(
                                                                    (data) => {
                                                                        console.log(
                                                                            data
                                                                        );
                                                                    }
                                                                );

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
                                                        submitLabel="Gem"
                                                        cancelLabel="Luk"
                                                    >
                                                        <FormElement
                                                            type="text"
                                                            id="title"
                                                            label="Title"
                                                            default={
                                                                section.title
                                                            }
                                                        />

                                                        <FormElement
                                                            type="number"
                                                            id="asset"
                                                            label="Asset ID"
                                                            min={1}
                                                            max={
                                                                this.state
                                                                    .assets
                                                                    .length
                                                            }
                                                            default={
                                                                section.asset.id
                                                            }
                                                        />

                                                        <FormElement
                                                            type="textarea"
                                                            id="content"
                                                            label="Content"
                                                            default={
                                                                section.content
                                                            }
                                                        />
                                                    </Form>
                                                ),
                                            },
                                        });
                                    }}
                                >
                                    {section.title}
                                </div>
                            );
                        })}
                    </section>

                    <h2>Abouts</h2>
                    <section className="admin-section admin-about">
                        {this.state.abouts.map((about, i) => {
                            return (
                                <div
                                    className="admin-item"
                                    key={i}
                                    onClick={() => {
                                        this.setState({
                                            popup: {
                                                title: `Modificer "${about.title}"`,
                                                visible: true,
                                                children: (
                                                    <Form
                                                        onValid={async (
                                                            data
                                                        ) => {
                                                            await fetch(
                                                                `${ENDPOINT}/api/v1/abouts/${about.id}`,
                                                                {
                                                                    method:
                                                                        "PUT",
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "application/x-www-form-urlencoded",
                                                                        Authorization: `Bearer ${this.admin}`,
                                                                    },
                                                                    body: this.convertdata(
                                                                        data
                                                                    ),
                                                                }
                                                            )
                                                                .then((e) =>
                                                                    e.json()
                                                                )
                                                                .then(
                                                                    (data) => {
                                                                        console.log(
                                                                            data
                                                                        );
                                                                    }
                                                                );

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
                                                        submitLabel="Gem"
                                                        cancelLabel="Luk"
                                                    >
                                                        <FormElement
                                                            type="text"
                                                            id="title"
                                                            label="Title"
                                                            default={
                                                                about.title
                                                            }
                                                        />

                                                        <FormElement
                                                            type="textarea"
                                                            id="content"
                                                            label="Content"
                                                            default={
                                                                about.content
                                                            }
                                                        />
                                                    </Form>
                                                ),
                                            },
                                        });
                                    }}
                                >
                                    {about.title}
                                </div>
                            );
                        })}
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

                        <button
                            className="admin-button"
                            onClick={() => {
                                this.setState({
                                    popup: {
                                        title: "Tilføj Volunteer",
                                        visible: true,
                                        children: (
                                            <Form
                                                onValid={async (data) => {
                                                    const fData = new FormData();
                                                    Object.entries(
                                                        data
                                                    ).forEach((entry) => {
                                                        fData.append(
                                                            entry[0],
                                                            entry[1]
                                                        );
                                                    });

                                                    await fetch(
                                                        `${ENDPOINT}/api/v1/volunteers`,
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/x-www-form-urlencoded",
                                                                Authorization: `Bearer ${this.admin}`,
                                                            },
                                                            body: fData,
                                                        }
                                                    )
                                                        .then((e) => e.json())
                                                        .then((data) => {
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

                                                <FormElement
                                                    type="textarea"
                                                    id="extra"
                                                    label="Extra"
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

                    <h2>Animals</h2>
                    <section className="admin-section admin-animals">
                        {this.state.animals.map((animal, i) => {
                            return (
                                <div className="admin-item" key={i}>
                                    {animal.name}
                                </div>
                            );
                        })}

                        <button
                            className="admin-button"
                            onClick={() => {
                                this.setState({
                                    popup: {
                                        title: "Tilføj Animal",
                                        visible: true,
                                        children: (
                                            <Form
                                                onValid={async (data) => {
                                                    await fetch(
                                                        `${ENDPOINT}/api/v1/animals`,
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type":
                                                                    "application/x-www-form-urlencoded",
                                                                Authorization: `Bearer ${this.admin}`,
                                                            },
                                                            body: this.convertData(
                                                                data
                                                            ),
                                                        }
                                                    )
                                                        .then((e) => e.json())
                                                        .then((data) => {
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
                                                    id="name"
                                                    label="Name"
                                                />

                                                <FormElement
                                                    type="textarea"
                                                    id="description"
                                                    label="Description"
                                                />

                                                <FormElement
                                                    type="number"
                                                    id="age"
                                                    label="Age"
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
                                                        "file",
                                                        data.file
                                                    );

                                                    await fetch(
                                                        `${ENDPOINT}/api/v1/assets`,
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                Authorization: `Bearer ${this.admin}`,
                                                            },
                                                            body: fData,
                                                        }
                                                    )
                                                        .then((e) => e.text())
                                                        .then((data) => {
                                                            console.log(data);
                                                        })
                                                        .catch((e) => {
                                                            console.error(e);
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
                                                    type="file"
                                                    id="file"
                                                    accept="image/*"
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
