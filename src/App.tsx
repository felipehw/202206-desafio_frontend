import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Users from './components/Users/users';

function App() {
  return (
    <Container className="App">
      <Row>
          <Col>
            <Users />
          </Col>
      </Row>
    </Container>
  );
}

export default App;
