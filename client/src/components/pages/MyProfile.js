import React from 'react';
import '../../App.css';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const GET_VIEWER_PROFILE = gql`
  query getViewerProfile {
    getViewerProfile {
      id
      fullname
      password
      email
      location
      date_of_birth
      phone_number
      avatar
    }
  }
`;

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
});

function checkAvatar(avatar) {
  if (avatar == null) {
    return (
      <img src="https://cdn2.iconfinder.com/data/icons/movies/32/robocop-movie-cinema-film-512.png" />
    );
  } else {
    return <img src={avatar} />;
  }
}

function checkMeta(label, metadata) {
  if (metadata == null) {
  } else {
    return <p>{`${label}: ${metadata}`}</p>;
  }
}

function MyProfile() {
  const classes = useStyles();
  return (
    <Query query={GET_VIEWER_PROFILE}>
      {({ data, error, loading }) => {
        if (loading) return 'Loading...';
        if (error) return JSON.stringify(error);
        const profile = data.getViewerProfile;

        console.log('Profile Details', data);
        return (
          <div className="main-container">
            <h1 className="page-title">My Profile</h1>
            <Card>
              <Avatar className={classes.avatar}>
                {checkAvatar(profile.avatar)}
              </Avatar>
              <CardContent>
                {checkMeta('Name', profile.fullname)}
                <p>Email: {profile.email}</p>
                {checkMeta('Location', profile.location)}
                {checkMeta('Phone Number', profile.phone_number)}
                <Link
                  className="link "
                  to={{ pathname: 'updateprofile', state: { profile } }}
                >
                  <button>Update Profile</button>
                </Link>
              </CardContent>
            </Card>
          </div>
        );
      }}
    </Query>
  );
}

export default MyProfile;
