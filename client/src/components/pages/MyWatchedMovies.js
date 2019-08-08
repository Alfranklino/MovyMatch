import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Movie2 from "../utils/Movie2";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "../../App.css";
import { FaGofore } from "react-icons/fa";

const GET_VIEWER_MOVIES = gql`
  {
    getViewerMovies {
      id
      user_id
      movie_tmdbid
    }
  }
`;

function MyWatchedMovies() {
  const [watchedMovies, setWatchedMovies] = useState();
  const [movies, setMovies] = useState();

  let getMovieFromApi = aTmdbidList => {
    let moviesDetails = [];
    let mergeCounter = aTmdbidList.length;
    aTmdbidList.map(tm => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${tm}?api_key=3bebb7ebadbbf8eb6778131702de6c18&language=en-US
`
        )
        .then(res => {
          console.log("resData", res.data, mergeCounter);
          moviesDetails.push(res.data);
          mergeCounter = mergeCounter - 1;
          if (mergeCounter == 0) {
            console.log("Merge Counter is now zero");
            setWatchedMovies(moviesDetails);
          }
        });
    });
  };

  const getMoviesByTmdbId = async movieListFromDb => {
    let tmdbidsList = [];

    movieListFromDb.map(mdb => {
      tmdbidsList.push(mdb.movie_tmdbid);
    });
    console.log("tmdbids", tmdbidsList);
    getMovieFromApi(tmdbidsList);
  };

  if (movies && !watchedMovies) {
    console.log("Get the movies again");
    getMoviesByTmdbId(movies);
  }

  console.log("RENDER");
  return (
    <div className='main-container'>
      <h1 className='page-title'>My Watched Movies</h1>
      <Query query={GET_VIEWER_MOVIES}>
        {({ loading, error, data, client }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          client.resetStore(); //Resetting the cache of the browser;
          if (!movies) {
            console.log("Get the movies from the db!");
            setMovies(data.getViewerMovies);
            return <p>Loading...</p>;
          } else if (!watchedMovies) {
            return <p>AJAXING FOR DETAILS</p>;
          }

          return null;
        }}
      </Query>
      {watchedMovies && (
        <section className='movies-container'>
          {watchedMovies.map((movie, i) => (
            <Movie2
              title={movie.title}
              img_src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              movieID={movie.id}
              key={i}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default MyWatchedMovies;
