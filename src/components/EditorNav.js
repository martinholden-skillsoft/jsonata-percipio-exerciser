import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { v4 as uuidv4 } from 'uuid';

import MenuNavLink from './MenuNavLink';

export default class EditorNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navlinkContent: this.props.navLinks
        .filter((link) => {
          return link.enabled;
        })
        .map((link, index) => (
          <MenuNavLink
            id={this.props.id + '-navlink-' + index}
            key={this.props.id + '-navlink-' + index}
            enabled={link.enabled}
            tooltip={link.tooltip}
            label={link.label}
            onClick={link.onClick}
          ></MenuNavLink>
        )),
    };
  }

  renderPopOver(props) {
    return (
      <Popover id={props.id + '-nav-popover-999'}>
        <Popover.Title as="h3">Transform Information</Popover.Title>
        <Popover.Content>{props.info}</Popover.Content>
      </Popover>
    );
  }

  renderInfoHover(props) {
    if (!props.info) {
      return null;
    }

    return (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={this.renderPopOver(props)}
      >
        <Nav key={props.id + '-nav-info-999'} className="mr-auto">
          <Navbar.Text>Info</Navbar.Text>
        </Nav>
      </OverlayTrigger>
    );
  }

  render() {
    const { label, className, id } = this.props;

    return (
      <Navbar key={id + '-navbar'} className={'py-0 mt-0 ' + className} bg="light" variant="light">
        <Nav key={id + '-nav'} className="mr-auto">
          <Navbar.Text>{<strong>{label}</strong>}&nbsp;</Navbar.Text>
          {this.renderInfoHover(this.props)}
        </Nav>
        {this.state.navlinkContent}
      </Navbar>
    );
  }
}

EditorNav.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,

  // An array of a certain type
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      tooltip: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

EditorNav.defaultProps = {
  label: 'Header',
  info: null,
  className: 'editor-nav',
  id: uuidv4(),
  navLinks: [
    { enabled: true, label: 'Format', tooltip: 'Format the editor contents', onClick: () => {} },
    {
      enabled: true,
      label: 'Download',
      tooltip: 'Download the editor contents',
      onClick: () => {},
    },
    {
      enabled: true,
      label: 'Download CSV',
      tooltip: 'Download the editor contents as CSV (UTF-8)',
      onClick: () => {},
    },
  ],
};
