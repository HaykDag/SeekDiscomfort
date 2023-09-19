const express = require("express");
const verifyToken = require("../utils/verifyToken");
//controller functions
const {
    signup,
    login,
    logoutUser,
    verifyUser,
    getUsers,
    deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// //verify
router.get("/verify", verifyToken, verifyUser);

//get all users
router.get("/", verifyToken, getUsers);

//get all users basket joined to them
//router.get('/getUsersWithBasket',verifyToken, getUsersWithBasket);

// //login
router.post("/login", login);

// //singup
router.post("/signup", signup);

//logout
router.get("/logout", logoutUser);

// //delete user
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
