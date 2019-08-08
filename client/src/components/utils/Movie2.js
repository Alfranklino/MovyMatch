import React from "react";
import Checkbox from "./Checkbox";

const Movie2 = ({ title, img_src, movieID }) => {
  return (
    <article className='aMovieBlock'>
      <img className='movie-poster' src={img_src} />
      <p className='movie-title'>{title}</p>
    </article>
  );
};

export default Movie2;
