import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import logo from "../assets/Logo.png";
import { useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../services/appApi'

function Navigation() {

  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();

  async function handleLogout(e){
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  }

  return (
    <Navbar bg='light' expand="lg" style={{background: 'rgb(255,255,255)',
      background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(204,210,210,1) 25%, rgba(176,182,182,1) 50%, rgba(165,170,170,1) 75%, rgba(59,71,71,1) 100%)'}}>
      
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width:50, height:50 }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            {user && (
              <NavDropdown title={
                <>
                  <img src={user.picture} style={{width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%"}} />
                  {user.name}
                </>
              } id="basic-nav-dropdown">
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                <NavDropdown.Item>
                  <Button value="danger" onClick={handleLogout}>Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  )
}

export default Navigation
