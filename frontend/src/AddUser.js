import React from "react";

export const AddUser = props => {
  let { handleOnChange, handleOnSubmit, newUser } = props;
  return (
    <div className="formDiv">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.name}
          onChange={handleOnChange}
          required
        />
        <br />
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          value={newUser.phonenumber}
          onChange={handleOnChange}
          required
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleOnChange}
          required
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleOnChange}
          required
        />
        <br />
        <input className='addButton' type="submit" />
      </form>
    </div>
  );
};
