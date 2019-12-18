import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovieForm = props => {
    const [updated, setUpdated] = useState(initMovie)

    useEffect(() => {
        const movieInfo = props.movies.find(
            m => `${m.id}` === props.match.params.id
        )
        if (movieInfo) {
            setUpdated(movieInfo)
        }
    }, [props.movies, props.match.params.id])

    const handleChanges = e => {
        setUpdated({
            ...updated,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${updated.id}`, updated)
            .then(res => 
                props.movies.map(movie => {
                    if(`${movie.id}` === props.match.params.id){
                        props.setMovies([res.data])
                    }
                })

                
            
                
                // props.setMovies(
                //     [...props.movies, res.data]
                // )
            )
            props.history.push(`/movies/${updated.id}`);
    }

    return (
        <div>
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    value={updated.title}
                    onChange={handleChanges}
                />
                <input
                    type='text'
                    name='director'
                    value={updated.director}
                    onChange={handleChanges}
                />
                <input
                    type='text'
                    name='metascore'
                    value={updated.metascore}
                    onChange={handleChanges}
                />
                <input
                    type='text'
                    name='stars'
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;