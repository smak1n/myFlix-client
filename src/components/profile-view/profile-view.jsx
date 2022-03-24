import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { setUser, updateUser } from '../../actions/actions';

import { connect } from 'react-redux';


import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  // Gets user data from API
  getUser() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem('token');

    axios.get(`https://smak1n-myflix.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      this.setState({
        Username: res.data.Username,
        Password: res.data.Password,
        Email: res.data.Email,
        Birthday: res.data.Birthday,
        FavoriteMovies: res.data.FavoriteMovies,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeitem("user");
    window.open("/", "_self");
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.getUser(token);
  }


  deleteUser() {
    const confirm = window.confirm('Are you sure you want to delete your account?');
    if (confirm) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      axios.delete(`https://smak1n-myflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Do you really want to delete your account?");
      })
      .then((res) => {
        alert("Account was successfully deleted");
      })
      .then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        this.setState({
          user: null,
        });
        window.open("/", "_self");
      })
      .catch((e) => {
        alert(e + "Account could not be deleted ");
      });
    }}

  deleteFavoriteMovie(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios.delete(`https://smak1n-myflix.herokuapp.com/users/${user}/Movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log(res);
      this.componentDidMount();
    });
  }

  render() {
    const { movies } = this.props;
    const userFavoriteMovies = this.state.FavoriteMovies;
    const FavoriteMoviesList = movies.filter((movie) =>
      userFavoriteMovies.includes(movie._id)
    );

    return (
      <Container xs={12} sm={4}>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <Card style={{ width: "50rem" }} className="profile-view">
                <Card.Header as="h5">Your Profile</Card.Header>
                <Card.Body>
                <Card.Text className="profile-text"> <b>Username:</b> {this.state.Username}</Card.Text>

                <Card.Text className="profile-text"><b>Email:</b> {this.state.Email}</Card.Text>

                <Card.Text className="profile-text"><b>Birthday: </b> {this.state.Birthday}</Card.Text>

                <div className="profile-buttons">
                  <Link to={"/users/:userId/update"}><Button variant="success" className="update-profile-button" style={{ margin: "25px" }}>Update Profile</Button></Link>

                  <Button variant="danger" onClick={() => this.deleteUser()} className="delete-profile-button" style={{ margin: "25px" }}>Delete Profile</Button>
  
                  <Link to={"/"}><Button className="profile-go-back-button" variant="secondary" style={{ margin: "25px" }}>Go Back</Button></Link>
                </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <br></br>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <Card style={{ width: "50rem" }}>
                <Card.Header as="h5">Favorite Movies</Card.Header>
                  <Row>
                    {FavoriteMoviesList.map((movie) => {
                      return (
                        <Col key={movie._id} xs={12} sm={4}>
                          <Card style={{ width: "12rem" }} className="favorite-movies mt-3 border border-dark rounded">

                            <Card.Img variant="top" src={movie.ImagePath} crossOrigin="*" width={250} height={350}/>

                            <Card.Body className="favorite-movies-card-body">
                              <Link to={`/movies/${movie._id}`}><Button variant="link" className="fav-movie-info">Movie Details</Button></Link>

                              <Button variant="link" className="fav-movie-remove" onClick={() => this.deleteFavoriteMovie(movie)}>Remove Movie</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, {setUser, updateUser})(ProfileView);
