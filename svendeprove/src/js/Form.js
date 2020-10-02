import React, { useState } from "react";
import FormElement from "./FormElement";

import "../css/Form.css";

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
                    onClick={async (e) => {
                        e.preventDefault();
                        e.persist();
                        e.target.setAttribute("disabled", "");

                        let data = {};
                        let valid = true;
                        let newAlerts = [];
                        let children = props.children || [];
                        if (children.length === undefined) {
                            children = [children];
                        }

                        children.forEach((child) => {
                            const childDOM = document.querySelector(
                                "#" + child.props.id
                            );

                            if (childDOM) {
                                let childValid = child.props.pattern
                                    ? child.props.pattern.test(childDOM.value)
                                    : childDOM.value !== "";

                                childDOM.classList.remove("error");
                                let add = true;

                                if (!childValid) {
                                    if (
                                        childDOM.getAttribute("required") === ""
                                    ) {
                                        childDOM.classList.add("error");
                                        valid = false;
                                        newAlerts.push(
                                            `"${child.props.label}" skal være udfyldt og gyldigt.`
                                        );
                                        add = false;
                                    }
                                }

                                if (add) {
                                    if (child.props.type === "file") {
                                        data[child.props.id] = [];

                                        for (
                                            let i = 0;
                                            i < childDOM.files.length;
                                            i++
                                        ) {
                                            data[child.props.id].push(
                                                childDOM.files[i]
                                            );
                                        }
                                    } else if (child.props.type === "number") {
                                        data[child.props.id] = parseInt(
                                            childDOM.value
                                        );
                                    } else {
                                        data[child.props.id] = childDOM.value;
                                    }
                                } else {
                                    data[child.props.id] = "null";
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
                                    childDOM.value = "";
                                }
                            });

                            await props.onValid(data, setAlerts);
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
                        onClick={async (e) => {
                            e.preventDefault();
                            e.persist();
                            e.target.setAttribute("disabled", "");

                            let data = [];
                            let children = props.children || [];
                            if (children.length === undefined) {
                                children = [children];
                            }

                            children.forEach((child) => {
                                const childDOM = document.querySelector(
                                    "#" + child.props.id
                                );

                                if (childDOM) {
                                    data[child.props.id] = childDOM.value;
                                    childDOM.value = "";
                                }
                            });

                            await props.onCancel(data);

                            e.target.removeAttribute("disabled");
                        }}
                    />
                ) : null}
            </div>
        </form>
    );
};

export default Form;
