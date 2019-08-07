import React from "react";
import axios from "axios";
import "./App.css";
// =====================Apollo & Related=================
import client from "./utils/apolloClient";
import { ApolloProvider } from "react-apollo";
// =====================Lodash====================
import { without } from "lodash";
import { findIndex } from "lodash";
import { uniq } from "lodash";
import { uniqBy } from "lodash";
import { forEach } from "lodash";
import { intersection } from "lodash";
// =====================Context, Providers====================
import { MovieProvider } from "./components/context/MovieContext";
import { ViewerProvider } from "./components/context/ViewerContext";
// =====================Routing====================
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
// =====================Components=================
import Nav from "./components/utils/Navigation";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Logout from "./components/pages/Logout";
import Movies from "./components/pages/Movies";
import MyWatchedMovies from "./components/pages/MyWatchedMovies";
import MyProfile from "./components/pages/MyProfile";
import MyMatches from "./components/pages/MyMatches";
import Footer from "./components/utils/Footer";

const history = createHistory();

function App(props) {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div className='App'>
          <ViewerProvider>
            <Nav />
            <Switch>
              <MovieProvider>
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/logout' exact component={Logout} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/movies' exact component={Movies} />
                <Route path='/watchedmovies' exact component={MyWatchedMovies} />
                <Route path='/myprofile' exact component={MyProfile} />
                <Route path='/mymatches' exact component={MyMatches} />
              </MovieProvider>
            </Switch>
            <Footer />
          </ViewerProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
