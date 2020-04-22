import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class EditorNav extends Component {
  constructor(props) {
    super(props);
    this.onFormatClick = this.onFormatClick.bind(this);
  }

  onFormatClick(eventKey, event) {
    if (this.props.formatEnabled && this.props.onFormatClick) {
      this.props.onFormatClick(eventKey, event);
    }
  }

  render() {
    const { label, formatEnabled, formatLabel } = this.props;

    let formatlink;
    if (formatEnabled) {
      formatlink = (
        <Nav>
          <Nav.Link onClick={this.onFormatClick}>{formatLabel}</Nav.Link>
        </Nav>
      );
    }

    return (
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Brand>{label}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {formatlink}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

EditorNav.propTypes = {
  label: PropTypes.string,
  formatEnabled: PropTypes.bool,
  formatLabel: PropTypes.string,
  onFormatClick: PropTypes.func,
};

EditorNav.defaultProps = {
  label: 'Header',
  formatEnabled: true,
  formatLabel: 'Format',
  onFormatClick: function () {},
};
