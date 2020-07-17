import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import docs from './images/docs-white-32.png';
import docspercipio from './images/docs-white-percipio.png';
import _ from 'lodash';

export default class MainNav extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  createSourceItem(sourceItem) {
    return (
      <NavDropdown.Item key={sourceItem.id} eventKey={sourceItem.id}>
        {sourceItem.name}
      </NavDropdown.Item>
    );
  }

  createSourceItems() {
    const results = [];
    _.forEach(this.props.sources, (value, key) => {
      results.push(this.createSourceItem(value));
    });
    return (
      <NavDropdown title="Select Base Data" id="nav-selectdata" onSelect={this.onSelect}>
        {results}
      </NavDropdown>
    );
  }

  onSelect(eventKey, event) {
    if (this.props.onSourceSelect) {
      this.props.onSourceSelect(eventKey, event);
    }
  }

  render() {
    const { version } = this.props;

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>JSONata Percipio Excerciser</Navbar.Brand>{' '}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">{this.createSourceItems()}</Nav>
          <Nav>
            <Nav.Item>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>JSONata Percipio Documentation.</Tooltip>}
              >
                <Nav.Link
                  eventKey="percipiojsonata"
                  href="https://skillsoftdev.atlassian.net/wiki/spaces/INTROC/pages/1100219620/Percipio+JSONata+Transform+Library"
                  target="_blank"
                >
                  <img src={docspercipio} alt="JSONata Percipio Documentation" />
                </Nav.Link>
              </OverlayTrigger>
            </Nav.Item>

            <Nav.Item>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id={`tooltip-bottom`}>Core JSONata Documentation</Tooltip>}
              >
                <Nav.Link
                  eventKey="corejsonata"
                  href="https://docs.jsonata.org/overview"
                  target="_blank"
                >
                  <img src={docs} alt="Core JSONata Documentation" />
                </Nav.Link>
              </OverlayTrigger>
            </Nav.Item>
            <Nav.Item>
              <Navbar.Text className="text-muted">{` v${version}`}</Navbar.Text>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

MainNav.propTypes = {
  onSourceSelect: PropTypes.func,
  sources: PropTypes.object,
  version: PropTypes.string,
};

MainNav.defaultProps = {
  onSourceSelect: function () {},
  sources: {},
  version: '',
};
