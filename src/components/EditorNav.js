import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import MenuNavLink from './MenuNavLink';

export default class EditorNav extends Component {
  render() {
    const { label, navLinks, className } = this.props;

    const content = navLinks
      .filter((link) => {
        return link.enabled;
      })
      .map((link) => (
        <MenuNavLink
          enabled={link.enabled}
          tooltip={link.tooltip}
          label={link.label}
          onClick={link.onClick}
        ></MenuNavLink>
      ));

    return (
      <Navbar className={'py-0 mt-0 ' + className} bg="light" variant="light">
        <Nav className="mr-auto">
          <Navbar.Text>{<strong>{label}</strong>}</Navbar.Text>
        </Nav>
        {content}
      </Navbar>
    );
  }
}

EditorNav.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,

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
  className: 'editor-nav',
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
