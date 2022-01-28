import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import { NavBar } from "../navbar-view/navbar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-update/profile-update";


import { Row, Col, Navbar, Nav } from 'react-bootstrap';
import Container from "react-bootstrap/Container";




export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://smak1n-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, user } = this.state;

    // if (movies.length === 0) return <Container className="main-view" />;

    return (
      <Router>
        <Container className="main-view">
          <NavBar user={user} />
          <br></br>
          <br></br>
          <br></br>
          <Row className='main-view justify-content-md-center'>
            <Route exact path='/' render={() => {
              if (!user) return(
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );

              if (movies.length === 0) return <Container className="main-view"></Container>;
              return movies.map(m => (
                <Col md={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }} />
            <Route path='/movies/:movieId' render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

              if (movies.length === 0) return <div className="main-view" />;
              return <Col xs={10} md={8} xl={6}>
                <MovieView movie={movies.find((m) => m._id === match.params.movieId)} onBackClick={() => history.goBack()} /> 
              </Col>
            }} />
            <Route path='/register' render={() => {
              if (user) return <Redirect to='/' />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }} />
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <Container className="main-view" />;
                return <Col md={8}>
                  <DirectorView director={movies.find((m) => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}  movies={movies}/>
                </Col>
              }} />
            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <Container className="main-view" />;
                return (
                  <Col>
                    <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} movies={movies} />
                  </Col>
                );
              }} />
            <Route path={`/users/:Username`} render={({ match, history }) => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

              if (movies.length === 0) return <Container className="main-view" />;
              return (
                <Col>
                  <ProfileView movies={movies} getUser={() => this.getUser() } onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route exact path="/users/:Username/update" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              return (
                <Col>
                  <ProfileUpdate />
                </Col>
              );
            }} /> 
          </Row>
        </Container>
      </Router>
    );
  }
}
