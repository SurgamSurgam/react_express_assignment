const { db } = require("../index.js");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(users => {
      res.status(200).json({
        status: "success",
        users: users,
        message: "Got all Users!"
      });
    })
    .catch(err => {
      res.status(404).json({
        status: "error",
        message: err.message
      });
      next(err.message);
    });
};

const getSingleUser = (req, res, next) => {
  let userId = +req.params.id;
  db.one("SELECT * FROM users WHERE id=$1", [userId])
    .then(user => {
      res.status(200).json({
        status: "success",
        user: user,
        message: "Got SINGLE user"
      });
    })
    .catch(err => next(err));
};

const editUser = (req, res, next) => {
  let queryStringArray = [];
  let bodyKeys = Object.keys(req.body);
  bodyKeys.forEach(key => {
    queryStringArray.push(key + "=${" + key + "}");
  });
  let queryString = queryStringArray.join(", ");
  console.log(queryString, "hii");
  if (req.body.username && req.body.username.toLowerCase() === "null") {
    req.body.username = null;
  }
  if (req.body.email && req.body.email.toLowerCase() === "null") {
    req.body.email = null;
  }
  if (req.body.password && req.body.password.toLowerCase() === "null") {
    req.body.password = null;
  }

  db.none(
    "UPDATE users SET " + queryString + " WHERE id=" + req.params.id,
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "updated 1 user"
      });
    })
    .catch(err => next(err));
};

const addUser = (req, res, next) => {
  db.none(
    "INSERT INTO users(username, email, password) VALUES (${username}, ${email}, ${password})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added 1 user"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllUsers, getSingleUser, editUser, addUser };
