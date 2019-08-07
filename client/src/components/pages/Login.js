import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';

import ReactDOM from 'react-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { TextField } from '@material-ui/core';
import { ViewerContext } from '../context/ViewerContext';

const LOGIN_BY_EMAIL = gql`
  mutation loginByEmail($input: LoginInput!) {
    loginByEmail(loginInfo: $input) {
      email
      password
      fullname
    }
  }
`;

function Login() {
  const [viewer, setViewer] = useContext(ViewerContext);
  return (
    <Mutation mutation={LOGIN_BY_EMAIL}>
      {(login, { data, error, loading, client }) => {
        if (loading) return 'Loading...';
        if (error) return JSON.stringify(error);
        // console.log('hi', data);
        if (data && data.loginByEmail && data.loginByEmail.fullname) {
          setViewer(data.loginByEmail.fullname);
        }
        return (
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Sorry, invalid email')
                .required('Email is ABSOLUTELY REQUIRED my Friend.'),
              password: Yup.string().required(
                'Password is ABSOLUTELY REQUIRED my Friend.',
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values));
              client.resetStore();
              login({ variables: { input: values } });
              setSubmitting(false);
            }}
          >
            {formikProps => (
              <div className="main-container">
                <h1 className="page-title">Login</h1>
                <section className="form-signup-container">
                  <form
                    className="form-signup"
                    onSubmit={formikProps.handleSubmit}
                  >
                    <TextField
                      type="text"
                      id="email"
                      className="signup-form-child textField"
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      label="Email"
                      variant="filled"
                      margin="normal"
                    />

                    <TextField
                      type="text"
                      id="password"
                      className="signup-form-child textField"
                      value={formikProps.values.password}
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      label="Password"
                      variant="filled"
                      margin="normal"
                    />
                    <button
                      type="submit"
                      className="btn signup-form-child"
                      value="Submit"
                      placeholder="Login"
                    >
                      Login{' '}
                    </button>
                  </form>
                </section>
              </div>
            )}
          </Formik>
        );
      }}
      {/* <div className="main-container">
        <h1 className="page-title">Login</h1>
      </div> */}
    </Mutation>
  );
}

export default Login;
