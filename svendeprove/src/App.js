import React from "react";
import BlockSection from "./BlockSection";
import Container from "./Container";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = { about: [], volunteers: [] };
    }

    componentDidMount() {
        const ENDPOINT = "https://dyrevelfaerd-alexander.herokuapp.com";

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
                <BlockSection url="/images/header/kittens.jpg">
                    <h1>Foreningen for Dyrevelfærd</h1>
                    <h4>Vi specialiserer os i dyrevelfærd</h4>
                </BlockSection>

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

                <BlockSection id="help" url="/images/help/save.jpg">
                    <h1>STÅR DU MED ET DYR I NØD?</h1>
                    <h4>
                        Ring til Dyrenes Vagtcentral på 1812 og få råd til hjælp
                        og håndtering af dyr
                    </h4>
                </BlockSection>

                <Container></Container>

                <BlockSection id="adopt" url="/images/adopt/adopt.jpg">
                    <h1>ADOPTER ET DYR</h1>
                    <h4>
                        Overvejer du et nyt medlem af familien? Måske du er det
                        perfekte match til et af vores mange svigtede
                        internatdyr, som venter på nye kærlige hjem.
                    </h4>
                </BlockSection>

                <Container></Container>
            </main>
        );
    }
}

export default App;
