import React, { useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import './registration-view.scss';


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

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
    } else if (password.length < 8) {
      setPassword("Password must be 8 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmail("Email is invalid");
      isReq = false;
    }

    return isReq;
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
      const isReq = validate();
      if(isReq){
        axios.post('https://smak1n-myflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(response => {
          console.error(response);
          alert('unable to register');
        });
      }
      // props.onRegistration(username);
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={9} md={6} xl={4}>
        <Card>
          <Card.Header className="text-center" as="h4">
            Create an account
          </Card.Header>

          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="Enter a username" />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Your password must be 8 or more characters" />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email adress" />
                {emailErr && <p>{emailErr}</p>}
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
            <Link to={'/'}>
              <Button variant="secondary">Login</Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  })
};