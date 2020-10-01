import React from "react";
import BlockSection from "./BlockSection";
import Container from "./Container";
import Form from "./Form";
import FormElement from "./FormElement";
import AdoptCard from "./AdoptCard";
import { Redirect } from "react-router-dom";
import Slideshow from "./Slideshow";
import { ENDPOINT } from "./Global";

import "../css/App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            about: [],
            volunteers: [],
            animals: [],
            slideshow: [],
            redirect: "",
        };
        this.abortController = new AbortController();
    }

    parseText(text) {
        return text.split("\n").map((line, i) => {
            return <p key={i}>{line}</p>;
        });
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
                this.setState({ about: data });
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

        // GET Slideshow
        fetch(`${ENDPOINT}/api/v1/adoptsections`, {
            signal: this.abortController.signal,
        })
            .then((e) => e.json())
            .then((data) => {
                this.setState({
                    slideshow: data.map((data) => {
                        return data.asset.url;
                    }),
                });
            });
    }

    render() {
        return (
            <>
                {this.state.redirect !== "" ? (
                    <Redirect to={this.state.redirect} />
                ) : (
                    <main id="top">
                        <BlockSection num={1} />

                        <Container id="about">
                            {this.state.about.map((item, i) => {
                                return (
                                    <section key={i}>
                                        <h2>{item.title}</h2>
                                        {this.parseText(item.content)}
                                    </section>
                                );
                            })}
                        </Container>

                        <Slideshow
                            slides={this.state.slideshow.map((data, i) => {
                                return (
                                    <img
                                        key={i}
                                        src={data}
                                        alt={"Slideshow"}
                                        className="slideshow-image"
                                    />
                                );
                            })}
                        />

                        <section id="volunteer">
                            <Container>
                                <div className="volunteer-padding">
                                    <h2>Bliv Frivillig</h2>

                                    <div className="volunteer-cards">
                                        {this.state.volunteers.map(
                                            (volunteer, i) => {
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
                                                                src={
                                                                    volunteer
                                                                        .asset
                                                                        .url
                                                                }
                                                                alt={
                                                                    volunteer.title
                                                                }
                                                            />

                                                            {this.parseText(
                                                                volunteer.content
                                                            )}
                                                        </section>

                                                        <div className="volunteer-card-extra">
                                                            {volunteer.extra}
                                                        </div>
                                                    </article>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </Container>
                        </section>

                        <BlockSection id="help" num={2} />

                        <section id="newsletter">
                            <Container>
                                <section>
                                    <h2>Tildmeld vores nyhedsbrev</h2>
                                    <p>
                                        Få inspiration og nyheder om
                                        dyrevelfærd, direkte i din indbakke.
                                    </p>
                                </section>
                                <section>
                                    <Form
                                        onValid={(data, setAlerts) => {
                                            const fData = new FormData();
                                            fData.append("email", data.email);
                                            fData.append("name", data.name);

                                            fetch(
                                                `${ENDPOINT}/api/v1/subscribers`,
                                                {
                                                    method: "POST",
                                                    body: fData,
                                                }
                                            )
                                                .then((data) => {
                                                    this.setState({
                                                        redirect: `/newsletter/${encodeURIComponent(
                                                            fData.get("email")
                                                        )}`,
                                                    });
                                                })
                                                .catch((e) => {
                                                    console.error(e);
                                                });
                                        }}
                                        submitLabel="Tilmeld"
                                        onCancel={async (data) => {
                                            await fetch(
                                                `${ENDPOINT}/api/v1/subscribers/${data.email}`,
                                                { method: "DELETE" }
                                            );
                                        }}
                                        cancelLabel="Afmeld"
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

                        <BlockSection id="adopt" num={3} />

                        <Container id="adopt-list">
                            <section className="adopt-list-padding">
                                <h1>Dyr hos os</h1>
                                <h4>{this.state.animals.length} dyr</h4>

                                <section className="adopt-list-items">
                                    {this.state.animals.map((animal, i) => {
                                        return (
                                            <AdoptCard
                                                key={i}
                                                num={animal.id}
                                                title={animal.name}
                                                content={this.parseText(
                                                    animal.description
                                                )}
                                                time={Math.floor(
                                                    (new Date().getTime() -
                                                        new Date(
                                                            animal.createdAt
                                                        ).getTime()) /
                                                        1000 /
                                                        60 /
                                                        60 /
                                                        24
                                                )}
                                                url={animal.asset.url}
                                            />
                                        );
                                    })}
                                </section>
                            </section>
                        </Container>
                    </main>
                )}
            </>
        );
    }
}

export default App;
