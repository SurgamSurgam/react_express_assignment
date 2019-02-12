import React from "react";
import Search from './Search.js';

export const Users = ({ usersData, handleOnClick, getAllUsers, formSubmitted, errorMessage, resetState, numUserDisplayed, offsetBy }) => {

  if (formSubmitted) {
    getAllUsers();
  }

  if (errorMessage) {
    resetState();
  }
  let usersDataMapped = usersData.map(user => {
    return (
      <li key={user.id} onClick={handleOnClick} value={user.id}>
        Username: {user.username} <br />
        Phone: {user.phonenumber} <br />
        Email: {user.email}
      </li>
    );
  });

  console.log(usersDataMapped);
  return (
    <div className="allUsersDiv">
      <h2>All Users</h2>

      <Search usersData={usersData} usersDataMapped={usersDataMapped} handleOnClick={handleOnClick}/>
      <ul className="allUsersUl">{usersDataMapped}</ul>
      <div className='buttonNumOfUsersDiv'>
        <button onClick={()=>getAllUsers(numUserDisplayed, offsetBy)}>Get {numUserDisplayed} more users</button>
      </div>
    </div>
  );
};
