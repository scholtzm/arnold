import React from 'react';
import { Container } from 'stardust';

const BasicContainer = (props) => (
  <Container fluid style={{ padding: '0 15px' }}>
    {props.children}
  </Container>
);

export default BasicContainer;
