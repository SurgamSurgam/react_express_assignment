let express = require("express");
let router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  editUser,
  addUser,
  deleteUser
} = require("../db/queries/userQueries.js");

/* GET users listing. */
router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.patch("/:id", editUser);
router.post("/", addUser);
router.delete("/:id", deleteUser);

module.exports = router;
