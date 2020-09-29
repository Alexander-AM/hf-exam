import React from "react";
import BlockSection from "./BlockSection";
import Container from "./Container";
import Form from "./Form";
import FormElement from "./FormElement";
import "./App.css";

const ENDPOINT = "https://dyrevelfaerd-alexander.herokuapp.com";

class App extends React.Component {
    constructor() {
        super();
        this.state = { about: [], volunteers: [] };
    }

    componentDidMount() {
        // GET About
        fetch(`${ENDPOINT}/api/v1/abouts`)
            .then((e) => e.json())
            .then((data) => {
                this.setState({ about: data });
            });

        // GET Volunteers
        fetch(`${ENDPOINT}/api/v1/volunteers`)
            .then((e) => e.json())
            .then((data) => {
                this.setState({ volunteers: data });
            });
    }

    render() {
        return (
            <main id="top">
                <BlockSection endpoint={ENDPOINT} num={1} />

                <Container id="about">
                    {this.state.about.map((item, i) => {
                        return (
                            <section key={i}>
                                <h2>{item.title}</h2>
                                {item.content.split("\n").map((text, i) => {
                                    return <p key={i}>{text}</p>;
                                })}
                            </section>
                        );
                    })}
                </Container>

                <section id="volunteer">
                    <Container>
                        <div className="volunteer-padding">
                            <h2>Bliv Frivillig</h2>

                            <div className="volunteer-cards">
                                {this.state.volunteers.map((volunteer, i) => {
                                    return (
                                        <article
                                            className="volunteer-card"
                                            key={i}
                                        >
                                            <div className="volunteer-card-title">
                                                {volunteer.title}
                                            </div>

                                            <section className="volunteer-card-content">
                                                <img
                                                    className="volunteer-card-image"
                                                    src={volunteer.asset.url}
                                                    alt={volunteer.title}
                                                />

                                                {volunteer.content
                                                    .split("\n")
                                                    .map((text, i) => {
                                                        return (
                                                            <p key={i}>
                                                                {text}
                                                            </p>
                                                        );
                                                    })}
                                            </section>

                                            <div className="volunteer-card-extra">
                                                {volunteer.extra}
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </Container>
                </section>

                <BlockSection endpoint={ENDPOINT} id="help" num={2} />

                <section id="newsletter">
                    <Container>
                        <section>
                            <h2>Tildmeld vores nyhedsbrev</h2>
                            <p>
                                Få inspiration og nyheder om dyrevelfærd,
                                direkte i din indbakke.
                            </p>
                        </section>
                        <section>
                            <Form
                                onValid={(data) => {
                                    const fData = new FormData();
                                    fData.append("email", data.email);
                                    fData.append("name", data.name);

                                    fetch(`${ENDPOINT}/api/v1/subscribers`, {
                                        method: "POST",
                                        body: fData,
                                    })
                                        .then((data) => {
                                            console.log(
                                                "Successfully created user."
                                            );
                                        })
                                        .catch(() => {
                                            console.log(
                                                "This user already exists."
                                            );
                                        });
                                }}
                                submitLabel="Tilmeld"
                            >
                                <FormElement
                                    type="text"
                                    id="email"
                                    label="Email"
                                    pattern={
                                        // eslint-disable-next-line
                                        /(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                                    }
                                    required
                                />

                                <FormElement
                                    type="text"
                                    id="name"
                                    label="Navn"
                                    required
                                />
                            </Form>
                        </section>
                    </Container>
                </section>

                <BlockSection endpoint={ENDPOINT} id="adopt" num={3} />

                <Container id="adopt-list">
                    <section className="adopt-list-padding">
                        <h2>Dyr hos os</h2>
                    </section>
                </Container>
            </main>
        );
    }
}

export default App;
