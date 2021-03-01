import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      alertVisible: false,
      variant: this.props.variant,
    };
  }

  setAlertVisible = (isVisible) => {
    this.setState({
      alertVisible: isVisible,
    });
  };

  setMessage = (message, variant) => {
    this.setState({
      message: message ? message : null,
      alertVisible: message ? true : false,
      variant: variant ? variant : this.props.variant,
    });
    if (this.props.autodismiss && this.props.delay && this.props.delay > 0) {
      setTimeout(() => {
        this.setAlertVisible(false);
      }, this.props.delay);
    }
  };

  render() {
    let notification;
    if (this.state.alertVisible) {
      notification = (
        <Alert
          variant={this.state.variant}
          onClose={() => this.setAlertVisible(false)}
          className="mb-0"
          dismissible
        >
          {this.state.message}
        </Alert>
      );
    }

    return <div>{notification}</div>;
  }
}

Notification.propTypes = {
  autodismiss: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  autodismiss: false,
  delay: 2000,
  variant: 'warning',
};
