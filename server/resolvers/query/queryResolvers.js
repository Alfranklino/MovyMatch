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
            "SELECT m.id, m.tmdbid, m.imdbid FROM movymatch.movies AS m  INNER JOIN movymatch.watchedmovies AS wm ON m.tmdbid = wm.movie_tmdbid WHERE wm.user_id = $1",
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
    }
  }
};
