import React from "react";

const UserForm = props => {
  return (
    <form onSubmit={props.getUser}>
      <input
        style={{ margin: "50px", display: "block" }}
        type='text'
        name='userID'
        placeholder='User ID'
      />
      <input
        style={{ margin: "50px", display: "block" }}
        type='text'
        name='movieID'
        placeholder='Movie ID'
      />
      ​<button>Submit</button>
    </form>
  );
};
export default UserForm;
