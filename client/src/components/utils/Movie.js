import React from 'react';
import Checkbox from './Checkbox';

const Movie = ({ title, img_src, movieID }) => {
  return (
    <article className="aMovieBlock">
      <Checkbox name="movieArray" value={movieID} />
      <img className="movie-poster" src={img_src} />
      <p className="movie-title">{title}</p>
    </article>
  );
};

export default Movie;
