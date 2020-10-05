import React from "react";

import "../css/ErrorBoundary.scss";

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch = (error, info) => {
        this.setState({ error: error, errorInfo: info });
    };

    render() {
        if (this.state.errorInfo) {
            return (
                <>
                    <div className="error-boundary">
                        An error has occured!:{" "}
                        {JSON.stringify(this.state.errorInfo)}
                    </div>
                </>
            );
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
