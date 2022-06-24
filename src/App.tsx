import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Users from './components/Users/users';
import PageErrorOffline from './components/PageErrorOffline/pageErrorOffline';
import PageFailedRequest from './components/PageFailedRequest/pageFailedRequest';
import Page404 from './components/Page404/page404';

function App() {
  return (
      <Container data-testid="App" className="App" >
        <Row>
            <Col>
              <Routes>
                <Route path='/' element={<Navigate to='/users' />} />
                <Route path='/users' element={<Users />} />
                <Route path='/offline' element={<PageErrorOffline />} />
                <Route path='/failed-request' element={<PageFailedRequest />} />
                <Route path='*' element={<Page404 />} />
              </Routes>
            </Col>
        </Row>
      </Container>
  );
}

export default App;
