import React from 'react';
import { Container } from 'reactstrap';
import NavBar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Sidebar from '../layout/Sidebar';

const AppLayout = ({ children, routes, ...props }) => (
  <div className="wrapper">
    <Sidebar />
    <div className="main-panel">
      <NavBar {...props} brandText="ToDos" />
      <div className="content">
        <Container fluid>{children}</Container>
      </div>
      <Footer fluid />
    </div>
  </div>
);

export default AppLayout;
