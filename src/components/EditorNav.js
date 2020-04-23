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
    const { label, formatEnabled, formatLabel, className } = this.props;

    let formatlink;
    if (formatEnabled) {
      formatlink = (
        <Nav>
          <Nav.Link onClick={this.onFormatClick}>{formatLabel}</Nav.Link>
        </Nav>
      );
    }

    return (
      <div className={className}>
        <Navbar className="py-0 mt-0" bg="light" variant="light">
          <Nav className="mr-auto">
            <Navbar.Text className="">{<strong>{label}</strong>}</Navbar.Text>
          </Nav>
          {formatlink}
        </Navbar>
      </div>
    );
  }
}

EditorNav.propTypes = {
  label: PropTypes.string,
  formatEnabled: PropTypes.bool,
  formatLabel: PropTypes.string,
  onFormatClick: PropTypes.func,
  className: PropTypes.string,
};

EditorNav.defaultProps = {
  label: 'Header',
  formatEnabled: true,
  formatLabel: 'Format',
  onFormatClick: function () {},
  className: 'editor-nav',
};
