import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default class EditorNav extends Component {
  constructor(props) {
    super(props);
    this.onFormatClick = this.onFormatClick.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.onDownloadCSVClick = this.onDownloadCSVClick.bind(this);
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

  onDownloadCSVClick(eventKey, event) {
    if (this.props.downloadCSVEnabled && this.props.onDownloadCSVClick) {
      this.props.onDownloadCSVClick(eventKey, event);
    }
  }

  render() {
    const {
      label,
      formatEnabled,
      formatLabel,
      formatTooltip,
      downloadEnabled,
      downloadLabel,
      downloadTooltip,
      downloadCSVEnabled,
      downloadCSVLabel,
      downloadCSVTooltip,
      className,
    } = this.props;

    let formatlink;
    if (formatEnabled) {
      formatlink = (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-format`}>{formatTooltip}</Tooltip>}
        >
          <Nav>
            <Nav.Link onClick={this.onFormatClick}>{formatLabel}</Nav.Link>
          </Nav>
        </OverlayTrigger>
      );
    }

    let downloadlink;
    if (downloadEnabled) {
      downloadlink = (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-download`}>{downloadTooltip}</Tooltip>}
        >
          <Nav>
            <Nav.Link onClick={this.onDownloadClick}>{downloadLabel}</Nav.Link>
          </Nav>
        </OverlayTrigger>
      );
    }

    let downloadCSVlink;
    if (downloadCSVEnabled) {
      downloadCSVlink = (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-downloadCSV`}>{downloadCSVTooltip}</Tooltip>}
        >
          <Nav>
            <Nav.Link onClick={this.onDownloadCSVClick}>{downloadCSVLabel}</Nav.Link>
          </Nav>
        </OverlayTrigger>
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
          {downloadCSVlink}
        </Navbar>
      </div>
    );
  }
}

EditorNav.propTypes = {
  label: PropTypes.string,
  formatEnabled: PropTypes.bool,
  formatLabel: PropTypes.string,
  formatTooltip: PropTypes.string,
  onFormatClick: PropTypes.func,
  downloadEnabled: PropTypes.bool,
  downloadLabel: PropTypes.string,
  downloadTooltip: PropTypes.string,
  onDownloadClick: PropTypes.func,
  downloadCSVEnabled: PropTypes.bool,
  downloadCSVLabel: PropTypes.string,
  downloadCSVTooltip: PropTypes.string,
  onDownloadCSVClick: PropTypes.func,
  className: PropTypes.string,
};

EditorNav.defaultProps = {
  label: 'Header',
  formatEnabled: true,
  formatLabel: 'Format',
  formatTooltip: 'Format the editor contents',
  onFormatClick: function () {},
  downloadEnabled: true,
  downloadLabel: 'Download',
  downloadTooltip: 'Download the editor contents',
  onDownloadClick: function () {},
  downloadCSVEnabled: false,
  downloadCSVLabel: 'Download CSV',
  downloadCSVTooltip: 'Download the editor contents as CSV (UTF-8)',
  onDownloadCSVClick: function () {},
  className: 'editor-nav',
};
