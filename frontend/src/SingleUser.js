import React from "react";

export const SingleUser = props => {
  let { usersData, deleteUser, toggleEditing, editing, newUser, handleOnChange, handleEditSubmit } = props;

  let foundUser = usersData.find(user => {
    return +props.match.params.id === user.id;
  });


  return (
    <div className="singleUserDiv">
      <h2>Single User</h2>
      {/*first ternary checks if foundUser exists, if true then allow editing else show user.  If foundUser is false show null */}
      {foundUser ? (editing === foundUser.id ? (
        <>
          <ul className="singleUserUl editedUl">
            <li>Username: {foundUser.username}
              <input type='text' name="username"
                placeholder="Username"
                value={newUser.name}
                onChange={handleOnChange}/>
            </li>
            <li>Phone: {foundUser.phonenumber}
              <input type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={newUser.phonenumber}
                onChange={handleOnChange}/>
            </li>
            <li>Email: {foundUser.email}
              <input type="text"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleOnChange}/>
            </li>
          </ul>
          <div className='singleUserButtons'>
            <button onClick={()=>{toggleEditing(foundUser.id)}}>CANCEL</button>
            <button onClick={(e)=>{handleEditSubmit(e, foundUser.id)}}>SUBMIT</button>
          </div>
        </>
      ): (
        <>
          <ul className="singleUserUl">
            <li>Username: {foundUser.username}</li>
            <li>Phone: {foundUser.phonenumber}</li>
            <li>Email: {foundUser.email}</li>
          </ul>
          <div className='singleUserButtons'>
            <button onClick={()=>{toggleEditing(foundUser.id)}}>EDIT</button>
            <button onClick={()=>{deleteUser(foundUser.id)}}>DELETE</button>
          </div>
        </>
      )
      ) : null}
    </div>
  );
};
