import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ENDPOINT } from "./Global";

import "../css/Animal.scss";
import Container from "./Container";
import Loading from "./Loading";

const Animal = () => {
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
                            <h2 className="adopt-card-age">
                                {animal.age} years old
                            </h2>
                            <p className="adopt-card-text">
                                {animal.description}
                            </p>
                            <p className="adopt-card-time adopt-card-text">
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
                            </p>
                        </section>
                    </section>
                </Container>
            ) : (
                <Loading />
            )}
        </main>
    );
};

export default Animal;
