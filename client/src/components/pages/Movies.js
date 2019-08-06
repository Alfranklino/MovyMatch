import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { FaSearch } from "react-icons/fa";
// =====================Context====================
import { MovieContext } from "../context/MovieContext";
// =====================Components====================
import Movie from "../utils/Movie";

// function useMovies(res) {
//   const [movies, setMovies] = useContext(MovieContext);
//   setMovies(res);
//   useEffect(() => {
//     {
//       console.log("Inside UseEffect");
//       movies.map(movie => (
//         <Movie
//           title={movie.title}
//           img_src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           key={movie.id}
//         />
//       ));
//     }
//   }, []);

//   return {
//     movies,
//     setMovies
//   };
// }

function Movies() {
  const [searchedTerm, setSearchedTerm] = useState("Lion");
  const [movies, setMovies] = useContext(MovieContext);
  // const [movies, setMovies] = useState();

  const handleSearchedTerm = e => {
    setSearchedTerm(e.target.value);
  };

  const getMovies = e => {
    e.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3bebb7ebadbbf8eb6778131702de6c18&language=en-US&query=${searchedTerm}&page=1&include_adult=false`
      )
      .then(res => {
        console.log(res);
        setMovies(res.data.results);
      });
  };
  return (
    <div className='main-container'>
      <h1 className='page-title'>Movies</h1>
      <section className='search-movies'>
        <p>Looking for a movie?</p>
        <form onSubmit={getMovies} className='formSearch'>
          <input
            type='text'
            name='searchedTerm'
            value={searchedTerm}
            onChange={handleSearchedTerm}
            className='inputText'
          />
          <button type='submit' className='btn search'>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='movies-results'>
        <p>List of movies below...</p>
        <section className='movies-container'>
          {movies.map(movie => (
            <Movie
              title={movie.title}
              img_src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              key={movie.id}
            />
          ))}
        </section>

        {/* {useMovies(movies)} */}
        {/* {console.log("Inside Component")} */}
      </section>
    </div>
  );
}

export default Movies;
