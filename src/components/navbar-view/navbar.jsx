import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";


export class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  onLoggedOut() {
    localStorage.clear();
    window.open("/", "_self");
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar bg="primary" collapseOnSelect fixed="top" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand href="#home">myFlix</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href={movies} className="link-text">Movies</Nav.Link>

              <Nav.Link href={profile} className="link-text">Profile</Nav.Link>

              <Nav.Link href="/" onClick={this.onLoggedOut}>Log Out</Nav.Link>

            </Nav>
        </Container>
      </Navbar>
    );
  }
}
