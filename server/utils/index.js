const setCookie = require("./setCookie");
const createToken = require("./createToken");
const authenticate = require("./authenticate");

const authUtil = {setCookie, createToken, authenticate};

module.exports = { authUtil };