import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='main-container'>
      <h1 className='page-title'>MovyMatch</h1>
      <p className='home-body'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>

      <div className='buttons-group'>
        <Link className='btn signup' to='/signup'>
          Signup
        </Link>
        <Link className='btn login' to='/login'>
          Login
        </Link>
        <Link className='btn login' to='/movies'>
          My Movies
        </Link>
      </div>
    </div>
  );
}

export default Home;
