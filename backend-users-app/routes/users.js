let express = require("express");
let router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  editUser,
  addUser
} = require("../db/queries/userQueries.js");

/* GET users listing. */
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", editUser);
router.post("/", addUser);

module.exports = router;
