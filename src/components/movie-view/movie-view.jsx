import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Card, Button, Image, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {
  addToFavoriteMovies(movie) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    axios.post(
        `https://smak1n-myflix.herokuapp.com/users/${userId}/Movies/${this.props.movie._id}`, {},
        { headers: { Authorization: `Bearer ${token}`}}
      )
      .then((res) => {
        console.log(res);
        alert("This movie has been added to your Favorites.");
      });
  }
  
  render() {
    const { movie } = this.props;

    return (
      <Row className="movie-view justify-content-md-center">
        <Card style={{ width: "50rem" }}>
          <Image src={movie.ImagePath} fluid={true} crossOrigin="*" />
          <Card.Body>
            <Card.Title className="text-center">{movie.Title}</Card.Title>

            <Card.Text><b>Description:</b> {movie.Description}</Card.Text>
          </Card.Body>
          <Link to={`/directors/${movie.Director.Name}`}><Button variant="link" style={{ margin: "10px" }}>Director: {movie.Director.Name}</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}><Button variant="link" style={{ margin: "10px" }}>Genre: {movie.Genre.Name}</Button>
          </Link>
        </Card>
        <Link to={"/"}><Button className="back-button" variant="secondary" style={{ margin: "10px" }}>Back</Button>
          <Button onClick={() => this.addToFavoriteMovies(movie)} className="button-add-favorite">Add to Favorite Movies</Button>
        </Link>
      </Row>

    );
  }
}