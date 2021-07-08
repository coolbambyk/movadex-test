import React, { Fragment } from 'react';
import cn from 'classnames';
import { NavbarBrand, Navbar, Container } from 'reactstrap';

export default function NewNavbar({ brandText }) {
  return (
    <>
      <Navbar className={cn('navbar-absolute', 'navbar-transparent')}>
        <Container fluid style={{ minHeight: '40px' }}>
          <NavbarBrand href="#">{brandText}</NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
}
