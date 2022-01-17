import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, onBackClick, movies } = this.props;

    if (!genre) return null;

    return (
      <Container className="genre-view">
        <Row className="genre-view justify-content-md-center">
        <Card style={{ width: "30rem" }} className="genre-card">
          <Card.Body>
            <Card.Title className="genre-name">{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <Row>
              <Col>
                <p>
                  <strong>{genre.Name} Movies</strong>
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="img-container">
                {movies.map((m) => {
                  if (m.Genre && m.Genre.Name === genre.Name) {
                    return <Card.Img className="movie-img" variant="top" key={m._id} src={m.ImagePath} crossOrigin="*"/>
                  }
                })}
              </Col>
            </Row>
          </Card.Body>
          <Link to={"/"}>
            <Button variant="secondary" className="genre-view-back-button">
              Go Back
            </Button>
          </Link>
        </Card>
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};
