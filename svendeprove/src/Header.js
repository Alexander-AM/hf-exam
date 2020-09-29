import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import Container from "./Container";
import "./Header.css";

const Header = () => {
    const [currentPage, setCurrentPage] = useState("/");

    return (
        <header id="header-wrapper">
            <section id="header">
                <Container>
                    <section className="title">
                        <img
                            className="header-logo"
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <p>Foreningen for Dyrevelfærd</p>
                    </section>

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
                                    Bliv Frivillig
                                </Link>
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
