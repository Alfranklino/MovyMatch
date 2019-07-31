const jwt = require("jsonwebtoken")

const authenticate = (app, req) => {
  const cookieName = app.get("JWT_COOKIE_NAME")
  const jwtCookie = req.cookies[cookieName]
  const secret = app.get("JWT_SECRET")
  const { userID } = jwt.verify(jwtCookie, secret)

  return userID
}

module.exports = authenticate