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
          <Navbar.Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </Navbar.Text>
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
