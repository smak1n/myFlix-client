import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className='mb-4'>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin='*' />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};