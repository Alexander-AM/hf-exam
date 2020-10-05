import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Container from "./Container";
import { MdMenu } from "react-icons/md";

import "../css/Header.css";

const Header = () => {
    const [currentPage, setCurrentPage] = useState("/#top");

    return (
        <header id="header-wrapper">
            <section id="header">
                <Container>
                    <Link to="/" className="title">
                        <img
                            className="header-logo"
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <p>Foreningen for Dyrevelfærd</p>
                    </Link>

                    <label id="mobile-menu-label" htmlFor="mobile-menu">
                        <MdMenu />
                    </label>
                    <input id="mobile-menu" type="checkbox" />
                    <nav>
                        <ul>
                            <li>
                                <Link
                                    className={
                                        currentPage === "/#top" ? "active" : ""
                                    }
                                    to="/#top"
                                    onClick={() => {
                                        setCurrentPage("/#top");
                                    }}
                                >
                                    Hjem
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        currentPage === "/#about"
                                            ? "active"
                                            : ""
                                    }
                                    to="/#about"
                                    onClick={() => {
                                        setCurrentPage("/#about");
                                    }}
                                >
                                    Om os
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        currentPage === "/#volunteer"
                                            ? "active"
                                            : ""
                                    }
                                    to="/#volunteer"
                                    onClick={() => {
                                        setCurrentPage("/#volunteer");
                                    }}
                                >
                                    {" "}
                                    Bliv Frivillig
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        currentPage === "/#help" ? "active" : ""
                                    }
                                    to="/#help"
                                    onClick={() => {
                                        setCurrentPage("/#help");
                                    }}
                                >
                                    Dyr i nød?
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        currentPage === "/#adopt"
                                            ? "active"
                                            : ""
                                    }
                                    to="/#adopt"
                                    onClick={() => {
                                        setCurrentPage("/#adopt");
                                    }}
                                >
                                    Adopter et dyr
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Container>
            </section>
        </header>
    );
};

export default Header;
