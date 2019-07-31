const setCookie = (tokenName, token, res) => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: false
  })
}

module.exports = setCookie
