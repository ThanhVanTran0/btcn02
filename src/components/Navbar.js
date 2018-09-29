import React from 'react';

import { Navbar, NavItem, NavDropdown, Nav, MenuItem } from 'react-bootstrap';

export default function MyNavbar() {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">Flickr</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Sign in
      </NavItem>
        <NavItem eventKey={2} href="#">
          Sign up
      </NavItem>
      </Nav>
    </Navbar>
  );
}
