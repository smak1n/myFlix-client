import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";

// import "./profile-update.scss";

export function ProfileUpdate(props) {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [birthday, updateBirthday] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios.put(`https://smak1n-myflix.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    },{
      headers: { Authorization: `Bearer ${token}` },
    }
    )
  .then((res) => {
    const data = res.data;
    localStorage.setItem("user", data.Username);
    console.log("Your profile has been updated");
    alert("Your profile has been updated");
    window.open("/users/userId", "_self");
  })
  .catch((e) => {
    console.log("Something went wrong");
    alert("Something went wrong");
  });
  };

  return (
    <Container>
      <Row className="profile-update justify-content-md-center">
        <Col xs={6}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">
                  Update your account
                </Card.Title>
                <Form className="update-form">

                  <Form.Group controlId="formBasicUsername"className="update-item">
                    <Form.Label> <b>Update Username:</b></Form.Label>
                     
                    <Form.Control type="text" value={username} placeholder="New Username" onChange={(e) => updateUsername(e.target.value)}/>
 
                    <Form.Text className="text-muted">Must contain a minimum of 8 alphanumeric characters</Form.Text>

                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="update-item" >

                    <Form.Label><b>Update Password:</b></Form.Label>

                    <Form.Control type="password" value={password} placeholder="New Password" onChange={(e) => updatePassword(e.target.value)}/>

                    <Form.Text className="text-muted">Must contain a minimum of 8 alphanumeric characters</Form.Text>

                  </Form.Group>

                  <Form.Group controlId="formBasicEmail" className="update-item">
 
                    <Form.Label><b>Update Email:</b></Form.Label>
                      
                    <Form.Control type="email" value={email} placeholder="New Email Address" onChange={(e) => updateEmail(e.target.value)}/>
  
                  </Form.Group>

                   <Form.Group controlId="formBasicBirthday" className="update-item">
                    <Form.Label>Update Birthday:</Form.Label>
                    <Form.Control type="date" value={birthday} placeholder="New Birthday" onChange={(e) => updateBirthday(e.target.value)}/>
                  </Form.Group>

                  <Button type="submit" variant="success" className="update-profile-button" onClick={handleUpdate} style={{ margin: "27px" }}>Update Profile</Button>

                  <Link to={"/users/:userId"}>
                    <Button variant="secondary" className="update-profile-cancel-button" style={{ margin: "27px" }}>Cancel</Button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

ProfileUpdate.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date)
  }),
};