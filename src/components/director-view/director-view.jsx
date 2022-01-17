import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, onBackclick, movies, movie } = this.props;

    if (!director) return null;

    return (
      <Container className="director-view">
        <Row className="director-view justify-content-md-center">
        <Card style={{ width: "30rem" }} className="director-card">
          <Card.Body>
            <Card.Title className="director-name">{director.Name}</Card.Title>
            <Card.Text>Birthdate: {director.Birth}</Card.Text>
            <Card.Text>Bio: {director.Bio}</Card.Text>
            <Row>
              <Col>
                <p>
                  <strong>{director.Name}'s Movies</strong>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="img-container text-center">
                {movies.map((m) => {
                  if (m.Director && m.Director.Name === director.Name) {
                    return (
                      <div key={m._id}>
                        <Card.Img className="movie-img" variant="top" src={m.ImagePath} crossOrigin="*"/>
                      </div>
                    );
                  }
                })}    
              </Col>
            </Row>
          </Card.Body>
          <Link to={"/"}>
            <Button variant="secondary" className="director-view-back-button">
              Go Back
            </Button>
          </Link>
        </Card>
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),
};
