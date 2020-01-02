import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovieForm from "./UpdateMovieForm";
import axios from 'axios';


export default class MovieList extends Component {
  constructor() {
    super()
    this.state = {
      movies: []
    }
  }
  
  componentDidMount() {
    axios
    .get("http://localhost:5000/api/movies")
    .then(res => this.setState({movies: res.data}))
    .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
