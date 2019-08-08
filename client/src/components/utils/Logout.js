import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import gql from 'graphql-tag';
import { ViewerContext } from '../context/ViewerContext';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const LOGOUT = gql`
  mutation logout {
    logout {
      fullname
      status
    }
  }
`;

function Logout() {
  const [viewer, setViewer] = useContext(ViewerContext);
  const [toHome, setToHome] = useState(false);
  return (
    <Mutation mutation={LOGOUT}>
      {(logout, { loading, error, data, client }) => {
        if (toHome === true) {
          return <Redirect to="/" />;
        }
        return (
          <Formik
            onSubmit={() => {
              setToHome(true);
              logout();
              setViewer('');
            }}
          >
            {formikProps => {
              return (
                <form onSubmit={formikProps.handleSubmit}>
                  <button className="logoutButton" type="submit" value="Logout">
                    Logout
                  </button>
                </form>
              );
            }}
          </Formik>
        );
      }}
    </Mutation>
  );
}

export default Logout;
