import React, { useContext, useEffect } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { ViewerContext } from "../context/ViewerContext";

function Nav() {
  const [viewer, setViewer] = useContext(ViewerContext);

  return (
    <nav>
      <Link className='link' to='/'>
        <h3>Logo</h3>
      </Link>

      <ul className='nav-links'>
        {!viewer && (
          <Link className='link' to='/login'>
            <li>Login</li>
          </Link>
        )}
        {viewer && (
          <Link className='link' to='/logout'>
            <li>Logout</li>
          </Link>
        )}
        {!viewer && (
          <Link className='link' to='/signup'>
            <li>Signup</li>
          </Link>
        )}
        <Link className='link' to='/movies'>
          <li>Movies</li>
        </Link>
        {viewer && (
          <Link className='link' to='/watchedmovies'>
            <li>My Watched Movies</li>
          </Link>
        )}
        {viewer && (
          <Link className='link' to='/myprofile'>
            <li>My Profile</li>
          </Link>
        )}
        {viewer && (
          <Link className='link' to='/mymatches'>
            <li>My Matches</li>
          </Link>
        )}
      </ul>
      {viewer && <p className='hello'>{`Hello, ${viewer}`}</p>}
    </nav>
  );
}

export default Nav;
