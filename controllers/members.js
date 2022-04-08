const rfr = require("rfr");

const User = rfr("/module/users");

//GET USER BY ID
exports.getMemberById = async (req, res) => {
  console.log("sd...........sdfsdf");

  const userId = req.params.id;
  let userbyid;
  try {
    userbyid = await User.findById(userId);
    return res.json(userbyid);
  } catch (err) {
    console.log("get by id error", err);
  }
};

//GET USERS

exports.getMembers = async (req, res) => {
  //geting data from array
  // const members = await members.find();

  //Get data from Database
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("get data error", err);
  }
};

//POST DATA

exports.postMembers = async (req, res, next) => {
  const { name, age, email, status } = req.body;
  const tempImage = req.file;
  console.log("tempImage", tempImage);
  // const newMember = {
  //     id:uuid.v4(),bo
  //     name:req.body.name,
  //     email:req.body.email,
  //     age:req.body.age,
  //     status:'active',

  // }
  //Post the data into database
  const image = `./uploads/${tempImage.filename}`;
  console.log({ name, email, age, status, image });
  const addMember = new User({
    name,
    age,
    email,
    status,
    image,
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
};



//Update data from database

exports.updatwMembers = async (req, res) => {
  console.log("update function calling");
  const userId = req.params.id;
  console.log("id", userId);
  console.log("req.body: ", req.body);
  const { name, age, email, status } = req.body;
  let user;

  console.log("name, age, email, status", name, age, email, status);

  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log("validation", err);
  }

  if (!user) {
    return res.json({ msg: `User not found` });
  }

  user.name = name;
  user.age = age;
  user.email = email;
  user.status = status;

  if (req?.file?.filename) {
    user.image = `./uploads/${req.file.filename}`;
  }

  try {
    await user.save();
    return res.json({ msg: `Member Updated SuccesFully`, user });
  } catch (error) {
    console.log("Updation failled", error);
  }
};

//Delete Member

exports.deleteMember = async (req, res) => {
  const deleteUser = req.params.id;
  let user;
  try {
    user = await User.findById(deleteUser);
  } catch (error) {
    console.log("deleted data error", error);
  }

  try {
    await user.remove();
    return res.json({ msg: `Member Deleted SuccesFully`, user });
  } catch (error) {
    console.log("failed to delete", error);
  }
};
