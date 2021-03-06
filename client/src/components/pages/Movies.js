import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";

import "../../App.css";
import { FaSearch } from "react-icons/fa";
// =====================Context====================
import { MovieContext } from "../context/MovieContext";
// =====================Components====================
import Movie from "../utils/Movie";
import * as Yup from "yup";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

// We should also add the new Movies into to movie Table
const POSTWATCHEDMOVIE = gql`
  mutation postWatchedMovie($postWatchedMovieInfo: PostWatchedMovieInput!) {
    postWatchedMovie(postWatchedMovieInfo: $postWatchedMovieInfo) {
      id
      user_id
      movie_tmdbid
    }
  }
`;
// ======================COMPONENT STARTS HERE==============================
function Movies() {
  const [searchedTerm, setSearchedTerm] = useState("Lion");
  const [searchResults, setSearchResults] = useState({});
  const [movies, setMovies] = useContext(MovieContext);
  // const [movies, setMovies] = useState();

  const handleSearchedTerm = e => {
    setSearchedTerm(e.target.value);
  };

  function showPages(pTotalPages) {
    let pages = [];
    for (let i = 1; i <= pTotalPages; i++) {
      pages.push(
        <button className='btn login page' id={i} onClick={getMoviesByPage}>
          {i}
        </button>
      );
    }

    return pages;
  }

  const getMoviesByPage = e => {
    e.preventDefault();
    console.log("Here is eeee-id:", e.target.id);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3bebb7ebadbbf8eb6778131702de6c18&language=en-US&query=${searchedTerm}&page=${
          e.target.id
        }&include_adult=false`
      )
      .then(res => {
        console.log(res);
        setMovies(res.data.results);
      });
  };

  const getMovies = e => {
    e.preventDefault();

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3bebb7ebadbbf8eb6778131702de6c18&language=en-US&query=${searchedTerm}&page=1&include_adult=false`
      )
      .then(res => {
        console.log(res);
        setSearchResults(res.data);
        setMovies(res.data.results);
      });
  };
  return (
    <Mutation mutation={POSTWATCHEDMOVIE}>
      {(postWatchedMovie, { loading, error, data, client }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

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
              {searchResults.total_results && (
                <p className='searchInfos'>
                  Your research returned{" "}
                  <span className='emphasis'>{searchResults.total_results}</span> movies, in{" "}
                  <span className='emphasis'>{searchResults.total_pages}</span> pages.
                </p>
              )}

              {searchResults.total_results && (
                <section className='pagination'>{showPages(searchResults.total_pages)}</section>
              )}

              <Formik
                initialValues={{ movie_tmdbid: [] }}
                onSubmit={(values, { setSubmitting }) => {
                  alert(JSON.stringify(values, null, 2));

                  setSubmitting(false);
                  console.log(values);
                  postWatchedMovie({ variables: { postWatchedMovieInfo: values } });
                }}
              >
                {formik => (
                  <form className='movies-form'>
                    <section className='movies-container'>
                      {movies.map((movie, i) => (
                        <Movie
                          title={movie.title}
                          img_src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          movieID={movie.id}
                          key={i}
                        />
                      ))}
                    </section>

                    {searchResults.total_results && (
                      <button className='btn signup watched-movies-btn' onClick={formik.submitForm}>
                        I've seen these Movies
                      </button>
                    )}
                  </form>
                )}
              </Formik>

              {searchResults.total_results && (
                <section className='pagination'>{showPages(searchResults.total_pages)}</section>
              )}
            </section>
          </div>
        );
      }}
    </Mutation>
  );
}

export default Movies;
