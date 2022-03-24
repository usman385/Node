const rfr = require("rfr");
const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const uuid = require("uuid");
const members = rfr("/Members");
const { findById } = rfr("/module/users");

const User = rfr("/module/users");
const memberController = rfr("/controllers/members");

//get single member from array

// routes.get("/:id", (req, res) => {
//   const found = members.some((member) => member.id === parseInt(req.params.id));
//   if (found) {
//     res.json(members.filter((member) => member.id === parseInt(req.params.id)));
//   } else {
//     res.status(400).json({ msg: `NO record found of id ${req.params.id}` });
//   }
// });

//--------------------------*******************----------------------------------

//get single user from data base

routes.get("/:id", memberController.getMemberById);

//--------------------------*******************----------------------------------

//get all members from array
routes.get("/", memberController.getMembers);

//create a member using post method members

routes.post("/", memberController.postMembers);

//update member

// routes.put("/:id", (req, res) => {
//   const found = members.some((member) => member.id === parseInt(req.params.id));
//   if (found) {
//     const updateMember = req.body;
//     members.forEach((member) => {
//       if (member.id === parseInt(req.params.id)) {
//         (member.name = updateMember.name ? updateMember.name : member.name),
//           (member.email = updateMember.email
//             ? updateMember.email
//             : member.email),
//           (member.age = updateMember.age ? updateMember.age : member.age);

//         res.json({ msg: `Member Updated SuccesFully`, member });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `NO record found of id ${req.params.id}` });
//   }
// });

//--------------------------********update from database*****----------------------------------------

routes.put("/:id", memberController.updatwMembers);

//--------------------------********///////*****----------------------------------------
//deleted member
// routes.delete("/:id", (req, res) => {
//   const found = members.some((member) => member.id === parseInt(req.params.id));
//   if (found) {
//     res.json({
//       msg: "Member is deleted",
//       members: members.filter(
//         (member) => member.id !== parseInt(req.params.id)
//       ),
//     });
//   } else {
//     res.status(400).json({ msg: `NO record found of id ${req.params.id}` });
//   }
// });
//--------------------------********Delete from Database*****----------------------------------------

routes.delete("/:id", memberController.deleteMember);

module.exports = routes;
