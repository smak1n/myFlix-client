import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'react-bootstrap';

import "./login-view.scss";
// SCSS Import

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Card>
      <Card.Header className="text-center" as="h4">
        You have an account? Please Log in
      </Card.Header>
      
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-muted text-center">
        <Card.Text>
          You are not registered?
        </Card.Text>
        <Button variant="secondary">Sign up</Button>
      </Card.Footer>
    </Card>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
}; 