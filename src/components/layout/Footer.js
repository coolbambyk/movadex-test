/*eslint-disable*/
import React from "react";
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

export default function Footer(){
  return (
    <footer className="footer">
      <Container fluid>
        {/*
          <Nav>
            <NavItem>
              <NavLink href="javascript:void(0)">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="javascript:void(0)">Blog</NavLink>
            </NavItem>
          </Nav>
        */}
        <div className="copyright">
          © {new Date().getFullYear()} made by S.Yavorskyy
        </div>
      </Container>
    </footer>
  );
}
