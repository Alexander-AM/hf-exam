import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Animal.css";
import Container from "./Container";

const ENDPOINT = "https://dyrevelfaerd-alexander.herokuapp.com";

const Animal = (props) => {
    const [animal, setAnimal] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`${ENDPOINT}/api/v1/animals/${id}`)
            .then((e) => e.json())
            .then((data) => {
                setAnimal(data);
            });
    }, [id]);

    return (
        <main className="animal">
            {animal.id !== undefined ? (
                <Container>
                    <section className="animal-sides">
                        <img src={animal.asset.url} alt={animal.name} />

                        <section className="animal-info">
                            <h1>{animal.name}</h1>
                            <h2 className="adopt-card-time">
                                Været på internatet i{" "}
                                {Math.floor(
                                    (new Date().getTime() -
                                        new Date(animal.createdAt).getTime()) /
                                        1000 /
                                        60 /
                                        60 /
                                        24
                                )}{" "}
                                dage.
                            </h2>
                            <p>{animal.description}</p>
                        </section>
                    </section>
                </Container>
            ) : null}
        </main>
    );
};

export default Animal;
