import React from "react";
import Container from "./Container";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <Container>
                <div className="footer-info">
                    <section>
                        <h3>Kontakt</h3>
                        <address>
                            <ul>
                                <li>Tornebuskvej 22, 1.</li>
                                <li>1131 København K</li>
                                <li>CVR: 22446187</li>
                                <li>
                                    Husk at du kan få fradrag for donationer på
                                    op til 16.600 kr.
                                </li>
                            </ul>
                        </address>
                    </section>
                    <section>
                        <h3>Partnere</h3>
                        <ul>
                            <li>
                                <a
                                    href="https://google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Anima
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    World Animal Protection
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Fødevarestyrelsen
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Faktalink
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>
                <section className="footer-copyright">
                    (C) 2020 - Foreningen for Dyrevelfærd
                </section>
            </Container>
        </footer>
    );
};

export default Footer;
