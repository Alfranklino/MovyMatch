import React, { useState, useEffect, useContext } from 'react';
import '../../App.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { ViewerContext } from '../context/ViewerContext';
import { Mutation } from 'react-apollo';
import TextField from '@material-ui/core/TextField';

const UPDATE_PROFILE = gql`
  mutation updateProfile($updateProfileInfo: UpdateProfileInput!) {
    updateProfile(updateProfileInfo: $updateProfileInfo) {
      id
      fullname
      password
      email
      date_of_birth
      date_created
      avatar
      location
      status
    }
  }
`;

function UpdateProfile(props) {
  // const [searchedTerm, setSearchedTerm] = useState("Lion");
  const [viewer, setViewer] = useContext(ViewerContext);
  return (
    <Mutation mutation={UPDATE_PROFILE}>
      {(updateProfile, { loading, error, data, client }) => {
        if (loading) return 'Loading...';
        if (error) return JSON.stringify(error);
        const profile = props.location.state.profile;
        console.log(profile);
        return (
          <Formik
            initialValues={{
              fullname: profile.fullname,
              email: profile.email,
              password: profile.password,
              date_of_birth: profile.date_of_birth,
              phone_number: profile.phone_number,
              location: profile.location,
              avatar: profile.avatar,
            }}
            validationSchema={Yup.object().shape({
              fullname: Yup.string().required(
                'Fullame is ABSOLUTELY REQUIRED my Friend.',
              ),

              email: Yup.string()
                .email('Sorry, invalid email')
                .required('Email is ABSOLUTELY REQUIRED my Friend.'),
              password: Yup.string().required(
                'Password is ABSOLUTELY REQUIRED my Friend.',
              ),
              date_of_birth: Yup.date(),
              phone_number: Yup.number(),
              location: Yup.string(),
              avatar: Yup.string(),
            })}
            onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values, null, 2));
              client.resetStore(); //Resetting the cache of the browser;
              updateProfile({ variables: { updateProfileInfo: values } });
              setSubmitting(false);

              setViewer(values.fullname);
            }}
          >
            {({
              errors,
              status,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div className="main-container">
                <h1 className="page-title">Update Profile</h1>
                <section className="form-signup-container">
                  <form className="form-signup" onSubmit={handleSubmit}>
                    <TextField
                      id="fullname"
                      label="Fullname"
                      className="signup-form-child textField"
                      type="text"
                      margin="normal"
                      variant="filled"
                      value={values.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      className="signup-form-child textField"
                      type="email"
                      margin="normal"
                      variant="filled"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      className="signup-form-child text"
                      type="password"
                      margin="normal"
                      variant="filled"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      id="date_of_birth"
                      label="Date of birth"
                      className="signup-form-child text"
                      type="text"
                      margin="normal"
                      variant="filled"
                      value={values.date_of_birth}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      id="phone_number"
                      label="Phone Number"
                      className="signup-form-child text"
                      type="text"
                      margin="normal"
                      variant="filled"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      id="location"
                      label="Location"
                      className="signup-form-child text"
                      type="text"
                      margin="normal"
                      variant="filled"
                      value={values.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextField
                      id="avatar"
                      label="Avatar"
                      className="signup-form-child text"
                      type="text"
                      margin="normal"
                      variant="filled"
                      value={values.avatar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button type="submit" className="btn signup-form-child">
                      Submit
                    </button>
                  </form>
                </section>
              </div>
            )}
          </Formik>
        );
      }}
    </Mutation>
  );
}

export default UpdateProfile;
