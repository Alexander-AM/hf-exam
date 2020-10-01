import React from "react";

import "../css/Popup.css";

const Popup = (props) => {
    return (
        <article
            className="popup-container"
            style={{ display: props.visible ? "flex" : "none" }}
        >
            <section className="popup">
                <h2 className="popup-title">{props.title}</h2>
                <section className="popup-content">{props.children}</section>
            </section>
        </article>
    );
};

export default Popup;
