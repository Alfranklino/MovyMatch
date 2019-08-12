const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Promise = require("bluebird");

// var salt = bcrypt.genSaltSync(10);
module.exports = {
  Query: {
    async test(parent, args, context, info) {
      return "Hello World x3";
    },

    async getViewerProfile(parent, { args }, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);

      try {
        const query = {
          text: "SELECT * FROM movymatch.users WHERE id = $1",
          values: [userId]
        };

        result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },

    async getViewerMovies(parent, { args }, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);

      try {
        const query = {
          text:
            // "SELECT m.id, m.tmdbid, m.imdbid FROM movymatch.movies AS m  INNER JOIN movymatch.watchedmovies AS wm ON m.tmdbid = wm.movie_tmdbid WHERE wm.user_id = $1",
            "SELECT wm.id, wm.user_id, wm.movie_tmdbid FROM movymatch.watchedmovies AS wm WHERE wm.user_id = $1",
          values: [userId]
        };
        result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log(error.detail);
      }
    },

    async getUsersWithSameMovie(parent, { movieInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text:
            "SELECT u.id, u.fullname FROM movymatch.users AS u  INNER JOIN movymatch.watchedmovies AS wm ON u.id = wm.user_id WHERE wm.movie_tmdbid = $1",
          values: [movieInfo]
        };
        // console.log("Query:", query);
        result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log(error.detail);
      }
    },

    async getAllMovies(parent, args, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text: "SELECT id, tmdbid, imdbid FROM movymatch.movies"
        };
        const result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log("Error:", error.detail);
      }
    },

    async getAllUsers(parent, args, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text: "SELECT * FROM movymatch.users"
        };

        const result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log("Error:", error.detail);
      }
    },

    async getMatchesPercentage(parent, args, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);

      try {
        const query = {
          text: `SELECT u.fullname, T5.user_id, T5.same_movies, T5.percentage FROM 
                    (SELECT T3.user_id, 
                        COUNT(T3.movie_tmdbid) AS same_movies, 
                        ROUND((COUNT(T3.movie_tmdbid)/(SELECT COUNT(DISTINCT(T4.movie_tmdbid)) FROM movymatch.watchedmovies AS T4 WHERE T4.user_id = $1)::numeric),2) AS percentage  
                    FROM(SELECT wm.user_id, wm.movie_tmdbid 
                        FROM movymatch.watchedmovies AS wm
                        INNER JOIN (SELECT T.user_id, T.movie_tmdbid FROM movymatch.watchedmovies AS T WHERE T.user_id = $1 ) AS T2
                        ON ((wm.movie_tmdbid = T2.movie_tmdbid) AND (wm.user_id <> T2.user_id))) AS T3
                    GROUP BY T3.user_id) AS T5
                INNER JOIN movymatch.users AS u
                ON T5.user_id = u.id
                ORDER BY T5.percentage DESC`,
          values: [userId]
        };
        result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log(error.detail);
      }
    }
  }
};
