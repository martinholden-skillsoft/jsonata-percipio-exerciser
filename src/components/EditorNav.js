import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class EditorNav extends Component {
  constructor(props) {
    super(props);
    this.onFormatClick = this.onFormatClick.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
  }

  onFormatClick(eventKey, event) {
    if (this.props.formatEnabled && this.props.onFormatClick) {
      this.props.onFormatClick(eventKey, event);
    }
  }

  onDownloadClick(eventKey, event) {
    if (this.props.downloadEnabled && this.props.onDownloadClick) {
      this.props.onDownloadClick(eventKey, event);
    }
  }

  render() {
    const {
      label,
      formatEnabled,
      formatLabel,
      downloadEnabled,
      downloadLabel,
      className,
    } = this.props;

    let formatlink;
    if (formatEnabled) {
      formatlink = (
        <Nav>
          <Nav.Link onClick={this.onFormatClick}>{formatLabel}</Nav.Link>
        </Nav>
      );
    }

    let downloadlink;
    if (downloadEnabled) {
      downloadlink = (
        <Nav>
          <Nav.Link onClick={this.onDownloadClick}>{downloadLabel}</Nav.Link>
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
          {downloadlink}
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
  downloadEnabled: PropTypes.bool,
  downloadLabel: PropTypes.string,
  onDownloadClick: PropTypes.func,
  className: PropTypes.string,
};

EditorNav.defaultProps = {
  label: 'Header',
  formatEnabled: true,
  formatLabel: 'Format',
  onFormatClick: function () {},
  downloadEnabled: true,
  downloadLabel: 'Download',
  onDownloadClick: function () {},
  className: 'editor-nav',
};
