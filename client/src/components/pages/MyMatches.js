import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MatchingUser from "../utils/MatchingUser";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import "../../App.css";

const GET_MATCHES_PERCENTAGE = gql`
  {
    getMatchesPercentage {
      fullname
      user_id
      same_movies
      percentage
    }
  }
`;

function MyMatches() {
  const [matches, setMatches] = useState();

  return (
    <div className='main-container'>
      <h1 className='page-title'>My Matches</h1>

      <Query query={GET_MATCHES_PERCENTAGE}>
        {({ loading, error, data, client }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          client.resetStore(); //Resetting the cache of the browser;

          if (!matches) {
            setMatches(data.getMatchesPercentage);
            // console.log("matches....", data.getMatchesPercentage);
          }
          return null;
        }}
      </Query>

      {matches && (
        <section className='matches-group'>
          {matches.map((aMatchingUser, i) => (
            <MatchingUser
              fullname={aMatchingUser.fullname}
              same_movies={aMatchingUser.same_movies}
              percentage={aMatchingUser.percentage}
              key={i}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default MyMatches;

{
  /* {matches &&
          
          ))} */
}
