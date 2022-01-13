import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'react-bootstrap';


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log(username, password);
      props.onRegistration(username);
  };

  return (
    <Card>
      <Card.Header className="text-center" as="h4">
        Create an account
      </Card.Header>

      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter a username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Your password must be 8 or more characters" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email adress" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Sign up</Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-muted text-center">
        <Card.Text>
          Already have an account?
        </Card.Text>
        <Button variant="secondary">Login</Button>
      </Card.Footer>
    </Card>
  );
}
RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};