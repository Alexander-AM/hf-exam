import React from "react";
import Container from "./Container";
import { ENDPOINT } from "./Global";

import "../css/BlockSection.css";

class BlockSection extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch(`${ENDPOINT}/api/v1/adoptsections/${this.props.num}`)
            .then((e) => e.json())
            .then((data) => {
                this.setState({ data: data });
            });
    }

    render() {
        return this.state.data.id !== undefined ? (
            <section
                id={this.props.id}
                className="block-section"
                style={{ backgroundImage: `url(${this.state.data.asset.url})` }}
            >
                <Container>
                    <h1>{this.state.data.title}</h1>
                    <h4>{this.state.data.content}</h4>
                </Container>
            </section>
        ) : null;
    }
}

export default BlockSection;
