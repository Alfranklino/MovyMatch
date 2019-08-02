import React from "react";
import axios from "axios";
import { without } from "lodash";
import { findIndex } from "lodash";
import { uniq } from "lodash";
import { uniqBy } from "lodash";
import { forEach } from "lodash";
import { intersection } from "lodash";
// =====================Components=================
import UserForm from "./components/UserForm";

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Movie {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}

class MovieFav {
  constructor(id, idUser, idMovie) {
    this.id = id;
    this.idUser = idUser;
    this.idMovie = idMovie;
  }
}

function App(props) {
  const getUser = e => {
    e.preventDefault();
    const movieID = e.target.elements.movieID.value;
    const userID = e.target.elements.userID.value;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=dc39e5e298cbc1511c2c0048a6fb2bf0&language=en-US&page=1
        `
      )
      .then(res => {
        const title = res.data.original_title;
        console.log(res);
        console.log("Title of this movie:", title);
      });
  };
  console.log("...");

  // Fake Users
  let jon = new User(1, "jon");
  let sam = new User(2, "sam");
  let lil = new User(3, "lil");
  let joe = new User(4, "joe");

  // Array of users
  let users = [];
  users.push(jon, sam, lil, joe);
  console.log(users);

  // Fake movies
  let mov1 = new Movie(1, "mov1");
  let mov2 = new Movie(2, "mov2");
  let mov3 = new Movie(3, "mov3");

  let movies = [];
  movies.push(mov1, mov2, mov3);

  // Array of movies

  // Fake movies_favourites
  let mf1 = new MovieFav(1, 1, 1);
  let mf2 = new MovieFav(2, 1, 3);
  let mf3 = new MovieFav(3, 3, 1);
  let mf4 = new MovieFav(4, 3, 2);
  let mf5 = new MovieFav(5, 2, 3);
  let mf6 = new MovieFav(6, 2, 2);
  let mf7 = new MovieFav(7, 4, 1);
  let mf8 = new MovieFav(8, 4, 2);
  let mf9 = new MovieFav(9, 4, 3);

  // Array of moviesFav
  let moviesFav = [];
  moviesFav.push(mf1, mf2, mf3, mf4, mf5, mf6, mf7, mf8, mf9);
  console.log(moviesFav);

  function getListOfMaxSimilarities(aListOfMovFav, aListOfUsers, theUser) {
    let finalSimilarities = [];

    // 0.let allSimilarities = []
    let allSimilarities = [];
    // 1.getDistinctUsers(aListOfMovFav) => [distinctUsers] --uniqBy
    // 2.getListOfUsersToCompare(aListOfMovFav, theUser) => [otherUsers] --without + needs 1.)
    // 3.getMoviesOfTheUser(aListOfMovFav, theUser) => [theUserMovies]
    /* 4.For Each aUser in distinctUsers {
        4.1.getMoviesOfTheUser(aListOfMovFav, aUser) => [aUserMovies]
        4.2.getSimilaritiesInfos(aUserMovies, theUserMovies) => [similarMovies] --intersection
        4.3.setTheUserSimilarities(aUser, [similarMovies]) => {aUser, [similarMovies]}
        4.4.allSimilarities.push({aUser, [similarMovies]})
      5.getBestSimilarities([allSimilarities], similarityCriteria) => [finalSimilarities]
}
*/

    return finalSimilarities;
  }

  // 1----------------------------
  function getDistinctUsers(aListOfMovFav, aListOfUsers) {
    let theDistinctUsers = [];
    let movFavByUsers = uniqBy(aListOfMovFav, "idUser");

    forEach(aListOfUsers, function(aUser) {
      let us = getUserFromMovFavList(movFavByUsers, aUser);

      if (us != undefined) {
        theDistinctUsers.push(us);
      }
    });

    return theDistinctUsers;
  }

  // 2--------------------------
  function getListOfUsersToCompare(aListOfMovFav, aListOfUsers, theUser) {
    let othersUsers = [];
    let aListOfUsersFromMovFav = getDistinctUsers(aListOfMovFav, aListOfUsers);
    othersUsers = without(aListOfUsersFromMovFav, theUser);

    return othersUsers;
  }

  // 3-------------------------4.1
  function getMoviesOfTheUser(aListOfMovFav, aListOfMovies, theUser) {
    let theUserMovies = [];
    // 3.1 getMoviesIdsFromUser
    let moviesIds = getMoviesIdsFromFavByUser(aListOfMovFav, theUser);
    // 3.2 getMovieFromMovieId
    forEach(moviesIds, function(a) {
      theUserMovies.push(getMovieFromId(aListOfMovies, a));
    });

    return theUserMovies;
  }

  // 4.2-----------------------
  function getSimilaritiesInfos(aUserMovies, theUserMovies) {
    let listOfSimilarMovies = [];

    listOfSimilarMovies = intersection(aUserMovies, theUserMovies);

    return listOfSimilarMovies;
  }

  // Utils--------------------------------------
  function getMoviesIdsFromFavByUser(aListOfMovFav, theUser) {
    let ids = [];

    forEach(aListOfMovFav, function(a) {
      if (a.idUser == theUser.id) {
        ids.push(a.idMovie);
      }
    });
    // console.log(ids);
    return ids;
  }

  function getMovieFromId(aListOfMovies, anId) {
    let theMovie;

    forEach(aListOfMovies, function(a) {
      if (a.id == anId) {
        theMovie = a;
      }
    });

    return theMovie;
  }

  function getUserFromMovFavList(aMovFavList, aUser) {
    let theUser;

    forEach(aMovFavList, function(a) {
      // console.log("a:", a);
      // console.log("aUser:", aUser);

      if (a.idUser == aUser.id) {
        theUser = aUser;
        // console.log("a:", a);
        // console.log("aUser:", aUser);
      }
    });

    return theUser;
  }

  // Tests
  // console.log(getDistinctUsers(moviesFav));
  console.log("Distinct Users from moviesFav:", getDistinctUsers(moviesFav, users));
  console.log("List to compare:", getListOfUsersToCompare(moviesFav, users, jon));
  console.log("Movies this user watched:", getMoviesOfTheUser(moviesFav, movies, joe));
  console.log(
    "Movies that jon and joe watched:",
    getSimilaritiesInfos(
      getMoviesOfTheUser(moviesFav, movies, jon),
      getMoviesOfTheUser(moviesFav, movies, joe)
    )
  );
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>HTTP Calls in React</h1>
        <UserForm getUser={getUser} />
      </header>
    </div>
  );
}

export default App;
