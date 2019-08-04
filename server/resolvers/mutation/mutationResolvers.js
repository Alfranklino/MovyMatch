const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Promise = require("bluebird");

// This Salt is randomly generated each time;
var salt = bcrypt.genSaltSync(10);
module.exports = {
  Mutation: {
    // This Mutation is a combination of a signup + a login from the cookie resulted
    async signup(parent, { signupInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text:
            "INSERT INTO movymatch.users(fullname, password, email, location, date_of_birth) VALUES($1, $2, $3, $4, $5) RETURNING *",
          values: [
            signupInfo.fullname,
            bcrypt.hashSync(signupInfo.password, salt),
            signupInfo.email,
            signupInfo.location,
            signupInfo.date_of_birth
          ]
        };
        console.log("salt_signup:", salt);
        // console.log("Here is query:", query);
        const result = await postgres.query(query);

        const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32);
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString("base64");

        const jwtToken = authUtil.createToken(result.rows[0], app.get("JWT_SECRET"), csrfToken);

        authUtil.setCookie(app.get("JWT_COOKIE_NAME"), jwtToken, req.res);
        // =========================login=============================================================
        const user_id = result.rows[0].id;
        // console.log(user_id);
        const queryLogin = {
          text: "UPDATE movymatch.users SET status = 'online' WHERE id = $1 RETURNING *",
          values: [user_id]
        };

        const resultLogin = await postgres.query(queryLogin);

        return resultLogin.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    // login from email and password
    async loginByEmail(parent, { loginInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const queryCheckUserEmail = {
          text: "SELECT * FROM movymatch.users WHERE email = $1",
          values: [loginInfo.email]
        };
        console.log(queryCheckUserEmail);
        const resultCheckUserEmail = await postgres.query(queryCheckUserEmail);
        console.log(resultCheckUserEmail.rows);
        const isValid = bcrypt.compareSync(
          loginInfo.password,
          resultCheckUserEmail.rows[0].password
        );
        console.log(isValid);
        if (isValid) {
          const queryUpdateUserById = {
            text: "UPDATE movymatch.users SET status = 'online' WHERE id = $1 RETURNING *",
            values: [resultCheckUserEmail.rows[0].id]
          };

          const resultUpdateUserById = await postgres.query(queryUpdateUserById);

          // =================Generate new Token and Cookie===============================
          const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32);
          const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString("base64");

          const jwtToken = authUtil.createToken(
            resultUpdateUserById.rows[0],
            app.get("JWT_SECRET"),
            csrfToken
          );

          authUtil.setCookie(app.get("JWT_COOKIE_NAME"), jwtToken, req.res);

          return resultUpdateUserById.rows[0];
        } else {
          console.log("Fail to authenticate");
        }
      } catch (error) {
        console.log(error.detail);
      }
    },
    async logout(parent, args, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);
      try {
        const query = {
          text: "UPDATE movymatch.users SET status = 'inactive' WHERE id = $1 RETURNING *;",
          values: [userId]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    // --------------------MOVIES----------------------------
    async saveMovie(parent, { saveMovieInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text: "INSERT INTO movymatch.movies (tmdbid,imdbid) VALUES ($1, $2) RETURNING *",
          values: [saveMovieInfo.tmdbid, saveMovieInfo.imdbid]
        };

        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    async postWatchedMovie(
      parent,
      { postWatchedMovieInfo },
      { postgres, authUtil, app, req },
      info
    ) {
      try {
        const user_id = authUtil.authenticate(app, req);
        const query = {
          text:
            "INSERT INTO movymatch.watchedmovies(user_id, movie_tmdbid) VALUES ($1, $2) RETURNING *",
          values: [user_id, postWatchedMovieInfo.movie_tmdbid]
        };
        console.log(query.text);
        console.log("User id:", user_id, "movie_id:", postWatchedMovieInfo.movie_tmdbid);

        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log("Error detail:", error.detail);
      }
    }
  }
};
