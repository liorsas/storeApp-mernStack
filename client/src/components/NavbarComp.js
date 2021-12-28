import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class NavbarComp extends Component {
  render() {
    return (
      <div>
        <>
          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand href="#home">Store App</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/customers">Customers</Nav.Link>
                <Nav.Link href="/purchased">Purchases</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      </div>
    );
  }
}
