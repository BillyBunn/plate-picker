import React from 'react';
import Container from '@material-ui/core/Container';

function Page({ children }) {
  return (
    <Container maxWidth="md" className="page">
      {children}
    </Container>
  );
}

export default Page;
