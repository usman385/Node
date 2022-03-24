const { Router } = require("express");
const express = require("express");
const rfr = require("rfr");
const UserSignup = rfr("/module/UserSignup");
const routes = express.Router();
const Member = rfr("/module/UserSignup");
const jwt = require("jsonwebtoken");

const authController = rfr("/controllers/auth");

routes.post("/SignUp", authController.SignUp);

routes.post("/Login", authController.Login);

module.exports = routes;
