import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { v4 as uuidv4 } from 'uuid';

export default class MenuNavLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: props.enabled,
    };
  }

  render() {
    if (!this.state.enabled) {
      return null;
    }

    const { tooltipid, tooltip, label, onClick, placement } = this.props;

    if (tooltip === null) {
      return (
        <Nav>
          <Nav.Link onClick={onClick}>{label}</Nav.Link>
        </Nav>
      );
    }

    return (
      <OverlayTrigger
        placement={placement || 'bottom'}
        overlay={<Tooltip id={tooltipid}>{tooltip}</Tooltip>}
      >
        <Nav>
          <Nav.Link onClick={onClick}>{label}</Nav.Link>
        </Nav>
      </OverlayTrigger>
    );
  }
}

MenuNavLink.propTypes = {
  enabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltipid: PropTypes.string,
  tooltip: PropTypes.string,
  placement: PropTypes.string,
};

MenuNavLink.defaultProps = {
  tooltipid: `tooltip-${uuidv4()}`,
  tooltip: null,
  placement: 'bottom',
  label: '',
};
