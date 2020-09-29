import React from "react";
import Container from "./Container";

import "./BlockSection.css";

const BlockSection = (props) => {
    return (
        <section
            id={props.id}
            className="block-section"
            style={{ backgroundImage: `url(${props.url})` }}
        >
            <Container>{props.children}</Container>
        </section>
    );
};

export default BlockSection;
