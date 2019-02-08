import React from "react";

export const Users = ({ usersData, handleOnClick, getAllUsers, formSubmitted }) => {

  if (formSubmitted) {
    getAllUsers();
  }

  let usersDataMapped = usersData.map(user => {
    return (
      <li key={user.id} onClick={handleOnClick} value={user.id}>
        Username: {user.username} <br />
        Email: {user.email}
      </li>
    );
  });

  return (
    <div className="allUsersDiv">
      <h2>All Users</h2>
      <p>For more information click on a user:</p>
      <ul>{usersDataMapped}</ul>
    </div>
  );
};
