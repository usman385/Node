const { Router } = require("express");
const express = require("express");
const rfr = require("rfr");
const routes = express.Router();

const authController = rfr("/controllers/auth.controller.js");

routes.post("/signup", authController.signUp);

routes.post("/login", authController.login);

routes.post("/reset-password", authController.resetPassword);

routes.post("/update-password", authController.updatePassword);

module.exports = routes;
