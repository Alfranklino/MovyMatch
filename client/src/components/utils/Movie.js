import React from "react";

const Movie = ({ img_src, title, movieId }) => {
  return (
    <article className='aMovieBlock'>
      <img className='movie-poster' src={img_src} />
      <p className='movie-title'>{title}</p>
    </article>
  );
};

export default Movie;
