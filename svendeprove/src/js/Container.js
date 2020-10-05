import React from "react";

import "../css/Container.scss";

const Container = (props) => {
    return (
        <div id={props.id} className="container">
            {props.children}
        </div>
    );
};

export default Container;
