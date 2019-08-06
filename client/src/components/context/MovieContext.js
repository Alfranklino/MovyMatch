import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieProvider = props => {
  const [movies, setMovies] = useState([]); //It's very important to initialise this state to an empty array!

  return (
    <MovieContext.Provider value={[movies, setMovies]}>{props.children}</MovieContext.Provider>
  );
};
