import React from "react";
import { Link } from "react-router-dom";
import "./AdoptCard.css";

const AdoptCard = (props) => {
    return (
        <Link className="adopt-card" to={`/animal/${props.num}`}>
            <figure>
                <img
                    className="adopt-card-image"
                    src={props.url}
                    alt={props.title}
                />
            </figure>
            <section>
                <h4 className="adopt-card-title">{props.title}</h4>
                <p className="adopt-card-text">{props.content}</p>
                <p className="adopt-card-time">
                    Været på internatet i {props.time} dage.
                </p>
            </section>
        </Link>
    );
};

export default AdoptCard;
