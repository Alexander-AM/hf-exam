import React, { useState } from "react";
import FormElement from "./FormElement";

import "./Form.css";

const Form = (props) => {
    const [alerts, setAlerts] = useState([]);

    return (
        <form className="form">
            <section className="form-alert">
                {alerts.length > 0 ? (
                    <ol className="form-alert-list">
                        {alerts.map((alert, i) => {
                            return <li key={i}>{alert}</li>;
                        })}
                    </ol>
                ) : null}
            </section>

            {props.children}

            <div className="form-button-container">
                <FormElement
                    type="button"
                    label={props.submitLabel || "Submit"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.target.setAttribute("disabled", "");

                        let data = {};
                        let valid = true;
                        let newAlerts = [];
                        let children = props.children;
                        if (children.length === undefined) {
                            children = [children];
                        }

                        children.forEach((child) => {
                            const childDOM = document.querySelector(
                                "#" + child.props.id
                            );

                            if (childDOM) {
                                const childValid = child.props.pattern
                                    ? child.props.pattern.test(childDOM.value)
                                    : childDOM.value !== "";

                                childDOM.classList.remove("error");

                                if (!childValid) {
                                    if (
                                        childDOM.getAttribute("required") !==
                                        undefined
                                    ) {
                                        childDOM.classList.add("error");
                                        valid = false;
                                        newAlerts.push(
                                            `Feltet "${child.props.label}" skal være udfyldt og gyldigt.`
                                        );
                                    }
                                }
                            }
                        });

                        if (valid) {
                            setAlerts([]);

                            children.forEach((child) => {
                                const childDOM = document.querySelector(
                                    "#" + child.props.id
                                );

                                if (childDOM) {
                                    data[child.props.id] = childDOM.value;
                                    childDOM.value = "";
                                }
                            });

                            props.onValid(data, setAlerts);
                        } else {
                            setAlerts(newAlerts);
                        }

                        e.target.removeAttribute("disabled");
                    }}
                />

                {props.onCancel !== undefined ? (
                    <FormElement
                        type="button"
                        label={props.cancelLabel || "Cancel"}
                        onClick={(e) => {
                            e.preventDefault();

                            props.onCancel();
                        }}
                    />
                ) : null}
            </div>
        </form>
    );
};

export default Form;
