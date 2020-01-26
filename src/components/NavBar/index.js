import React from 'react';
import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap';

export default function NavBar() {
    return(
        <>
  <Navbar bg="dark" variant="blue">
    <Navbar.Brand href="#home">Volanty</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Marca</Nav.Link>
      <Nav.Link href="#features">Modelo</Nav.Link>
      <Nav.Link href="#pricing">Ano</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  </>
    );
}

