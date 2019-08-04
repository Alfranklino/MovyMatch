const { gql } = require("apollo-server-express");

module.exports = gql`
  #   Query, Mutation, Subscription
  type Query {
    getViewerProfile: User!
    getViewerMovies: [Movie]!
    getUsersWithSameMovie(movieInfo: String!): [User]!
    getAllMovies: [Movie]!
    getAllUsers: [User]!
    test: String
  }

  type Mutation {
    signup(signupInfo: SignupInput!): User!
    loginByEmail(loginInfo: LoginInput!): User!
    logout: User!
    logoutAllUsers: [User]!
    updateProfile(updateProfileInfo: UpdateProfileInput!): User!
    saveMovie(saveMovieInfo: SaveMovieInput!): Movie!
    postWatchedMovie(postWatchedMovieInfo: PostWatchedMovieInput!): WatchedMovie!
  }

  #   Main Customs Types

  type User {
    id: ID!
    fullname: String!
    password: String!
    email: String!
    location: String
    date_of_birth: String
    phone_number: String
    date_created: String
    avatar: String
    status: String
  }

  type Movie {
    id: ID!
    tmdbid: String!
    imdbid: String!
  }

  type WatchedMovie {
    id: ID!
    user_id: Int!
    movie_tmdbid: String!
    date_created: String
  }

  # Main Inputs

  # User------------------------
  input SignupInput {
    fullname: String!
    password: String!
    email: String!
    date_of_birth: String
    phone_number: String
    avatar: String
    location: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input LogoutInput {
    id: ID
  }

  input UpdateProfileInput {
    email: String!
    fullname: String
    location: String
    date_of_birth: String
  }

  # movies---------------------
  input SaveMovieInput {
    tmdbid: String!
    imdbid: String!
  }

  # movieFav-------------------
  input PostWatchedMovieInput {
    # user_id: Int!
    movie_tmdbid: String!
  }
`;
