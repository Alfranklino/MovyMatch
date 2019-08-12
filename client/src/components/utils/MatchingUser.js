import React from "react";
import Checkbox from "./Checkbox";

const MatchingUser = ({ fullname, same_movies, percentage }) => {
  return (
    <article className='aMatchingUser'>
      <p className='fulname-match'>{fullname}</p>
      <p className='same_movies'>{same_movies}</p>
      <p className='percentage'>{percentage * 100}%</p>
    </article>
  );
};

export default MatchingUser;
