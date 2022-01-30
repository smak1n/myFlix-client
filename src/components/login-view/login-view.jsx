import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

import "./login-view.scss";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 4) {
      setUsernameErr("Username must be 4 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://smak1n-myflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
      <Card>
      <Card.Header className="text-center" as="h4">
        You have an account? Please Log in
      </Card.Header>
      
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
            {/* code added here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
            {/* code added here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-muted text-center">
        <Card.Text>
          You are not registered?
        </Card.Text>
        <Link to={"/register"}>
          <Button variant="secondary">Sign up</Button>
          </Link>
      </Card.Footer>
    </Card>
    </Col>
    </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);