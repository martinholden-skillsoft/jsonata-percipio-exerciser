import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      alertVisible: this.props.isVisible,
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
    if (!this.state.alertVisible) {
      return null;
    }

    return (
      <div>
        <Alert
          variant={this.state.variant}
          onClose={() => this.setAlertVisible(false)}
          className="mb-0"
          dismissible
        >
          {this.state.message}
        </Alert>
      </div>
    );
  }
}

Notification.propTypes = {
  autodismiss: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string,
  alertVisible: PropTypes.bool.isRequired,
};

Notification.defaultProps = {
  autodismiss: false,
  delay: 2000,
  variant: 'warning',
  message: '',
  alertVisible: false,
};
