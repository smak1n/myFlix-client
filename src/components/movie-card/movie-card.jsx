import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className='mb-4' style={{ height: '48rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='*' width='350rem'/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='link' >Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
    // Genre: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Description: PropTypes.string.isRequired
    // }),
    // Director: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Bio: PropTypes.string.isRequired,
    //   BirthYear: PropTypes.string.isRequired,
    //   DeathYear: PropTypes.string.isRequired
    // }),
    // Featured: PropTypes.bool.isRequired
  }).isRequired
};