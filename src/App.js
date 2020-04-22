import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './exerciserbootstrap.css';
import ExerciserBootstrap from './ExerciserBootstrap';
import MainNav from './MainNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <MainNav />
        <Row>
          <Col>
            <ExerciserBootstrap />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
