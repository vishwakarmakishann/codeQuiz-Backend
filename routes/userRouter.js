const express = require('express');
const { register, login, logout, getUsers, delUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/", getUsers);
userRouter.delete("/:id", delUser);

module.exports = userRouter;