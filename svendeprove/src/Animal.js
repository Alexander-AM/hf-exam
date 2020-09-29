import React from "react";
import { useParams } from "react-router-dom";

const ENDPOINT = "https://dyrevelfaerd-alexander.herokuapp.com";

class Animal extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = { data: {} };
    }

    componentDidMount() {
        fetch(`${ENDPOINT}/api/v1/animals/${1}`)
            .then((e) => e.json())
            .then((data) => {
                this.setState({ data: data });
            });
    }

    render() {
        return <main>{0}</main>;
    }
}

export default Animal;
