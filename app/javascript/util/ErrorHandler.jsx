import PropTypes from "prop-types";
import React from "react";
import logToSentry from "./logToSentry";

const ErrorDialog = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "500px",
        minHeight: "300px",
        marginTop: "4rem",
      }}
    >
      <h1>Error</h1>
      <p>
        {`We're sorry but something went wrong. We've been notified about this issue and we'll take a look at it shortly.`}
      </p>
      <a href="/" className="btn btn-primary">
        Continue
      </a>
    </div>
  );
};

export class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    logToSentry(error, info);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorDialog />;
    }
    return this.props.children;
  }
}
ErrorHandler.propTypes = {
  children: PropTypes.any,
};
