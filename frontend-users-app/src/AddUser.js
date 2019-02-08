import React from "react";

export const AddUser = props => {
  let { handleOnChange, handleOnSubmit, newUser } = props;
  return (
    <div className="formDiv">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={newUser.name}
          onChange={handleOnChange}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={newUser.email}
          onChange={handleOnChange}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={newUser.password}
          onChange={handleOnChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
