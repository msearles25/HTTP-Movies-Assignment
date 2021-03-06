import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };

  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
      // this.editMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    const movie = this.props.movies.find(
      m => `${m.id}` === this.props.match.params.id
    )
    this.props.history.push(`/update-movie/${movie.id}`)
  }

  deleteMovie = () => {
    const movie = this.props.movies.find(
      m => `${m.id}` === this.props.match.params.id
    )
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(this.props.history.push(`/`))
      
  }


  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        {console.log(this.props.movies)}
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div onClick={this.editMovie}>
          Edit
        </div>
        <div onClick={this.deleteMovie}>
          Delete
        </div>
      </div>
    );
  }
}
