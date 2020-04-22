import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import docs from './images/docs-white-32.png';
import docspercipio from './images/docs-white-percipio.png';

class MainNav extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>JSONata Percipio Excerciser</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link
              href="https://skillsoftdev.atlassian.net/wiki/spaces/INTROC/pages/1100219620/Percipio+JSONata+Transform+Library"
              target="_blank"
            >
              <img src={docspercipio} alt="JSONata Percipio Documentation" />
            </Nav.Link>
            <Nav.Link href="https://docs.jsonata.org/overview" target="_blank">
              <img src={docs} alt="JSONata Documentation" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNav;
