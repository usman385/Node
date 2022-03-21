const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const uuid = require("uuid");
const members = require("../../Members");
const { findById } = require("../../module/users");

const User = require("../../module/users");

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

routes.get("/:id", async (req, res) => {
  console.log('sdsdfsdf')
  const userId = req.params.id;
let userbyid;
  try {
  userbyid = await User.findById(userId);
 return res.json(userbyid);
  } catch (err) {
    console.log("get by id error", err);
  }
  
});

//--------------------------*******************----------------------------------

//get all members from array
routes.get("/", async (req, res) => {
  //geting data from array
  // const members = await members.find();

  //Get data from Database
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("get data error", err);
  }

  res.json(members);
});

//create a member using post method members

routes.post("/", async (req, res, next) => {
  const { name, age, email, status } = req.body;
  // const newMember = {
  //     id:uuid.v4(),bo
  //     name:req.body.name,
  //     email:req.body.email,
  //     age:req.body.age,
  //     status:'active',

  // }
  //Post the data into database
  console.log({ name, email, age, status });
  const addMember = new User({
    name,
    age,
    email,
    status,
  });

  if (
    !addMember == name ||
    !addMember == email ||
    !addMember == age ||
    !addMember == status
  ) {
    return res.status(400).json({ msg: "Please enter the name email and age" });
  } else {
    // members.push(newMember)
    // res.json(members)
    try {
      await addMember.save();
    } catch (err) {
      console.log(err);
    }
  }
});

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

routes.put("/:id",async (req, res) => {
  console.log("update function calling")
const updatebyid = req.params.id;
console.log("id",updatebyid)
const{name,age,email,status} = req.body;
let user;
try{
  user = await User.findById(updatebyid)
} catch(err){

  console.log("validation",err)

}
user.name = name;
user.age = age;
user.email = email;
user.status = status;

try{
  await user.save();
  return  res.json({ msg: `Member Updated SuccesFully`, user });
}
catch(error){
  console.log("Updation failled",error)
}
});



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

routes.delete("/:id", async (req, res) => {
const deleteUser = req.params.id;
let user;
try{
  user = await User.findById(deleteUser)

}
catch(error){
console.log("deleted data error",error)
}

try{
  await user.remove();
  return  res.json({ msg: `Member Deleted SuccesFully`, user });
}
catch(error){
  console.log("failed to delete",error)
}

});

module.exports = routes;
