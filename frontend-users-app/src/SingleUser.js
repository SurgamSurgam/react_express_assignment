import React from "react";

export const SingleUser = props => {
  let { usersData } = props;

  let foundUser = usersData.find(user => {
    return +props.match.params.id === user.id;
  });

  return (
    <div className="allUsersDiv">
      <h2>Single User</h2>
      {foundUser ? (
        <ul>
          <li>Username: {foundUser.username}</li>
          <li>Email: {foundUser.email}</li>
        </ul>
      ) : null}
    </div>
  );
};
