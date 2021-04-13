import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'


import Nav from 'react-bootstrap/Nav';
import { logOut } from "./services/firebase";
import { UserContext } from "./providers/UserProvider";
import { signInWithGoogle } from './services/firebase';
export default () => {
  const {user} = useContext(UserContext);
  const brand = <Navbar.Brand href="#home">Invoice Maker</Navbar.Brand>

  console.log("navbar user", user);
  if (user) {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        {brand}
        <Nav className="mr-auto">
          <LinkContainer to="/my-invoices">
            <Nav.Link>My Invoices</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/invoice?id=new">
            <Nav.Link>Create Invoice</Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text >
            Signed in as: {user.displayName}
          </Navbar.Text>
          <Button className="ml-2" variant="secondary" onClick={() => { logOut(); window.location.reload(); }}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  else {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        {brand}
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title="Login" id="basic-nav-dropdown" className="dropdown-menu-right">
            <NavDropdown.Item onClick={signInWithGoogle} >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                alt="google icon" />
              Google
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
