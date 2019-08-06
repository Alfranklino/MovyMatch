// import ApolloClient from "apollo-boost";

// const client = new ApolloClient({
//   uri: "http://localhost:8080/graphql"
// });

// export default client;

//Import these three files...
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
