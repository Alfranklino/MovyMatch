const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Promise = require("bluebird");

var salt = bcrypt.genSaltSync(10);
module.exports = {
  Mutation: {
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
        console.log("Here is query:", query);
        const result = await postgres.query(query);

        const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32);
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString("base64");

        const jwtToken = authUtil.createToken(result.rows[0], app.get("JWT_SECRET"), csrfToken);

        authUtil.setCookie(app.get("JWT_COOKIE_NAME"), jwtToken, req.res);
        // =========================login=============================================================
        const user_id = result.rows[0].id;
        console.log(user_id);
        const queryLogin = {
          text: "UPDATE movymatch.users SET status = 'online' WHERE id = $1 RETURNING *",
          values: [user_id]
        };

        const resultLogin = await postgres.query(queryLogin);

        return resultLogin.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    }
  }
};
