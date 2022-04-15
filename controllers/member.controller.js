const rfr = require("rfr");

const { User } = rfr("/models");

//GET USER BY ID
exports.getMemberById = async (req, res) => {
  const userId = req.params.id;
  let userById;
  try {
    userById = await User.findById(userId);
    return res.json(userById);
  } catch (err) {
    console.log("get by id error", err);
  }
};

//GET All USERS

exports.getMembers = async (req, res) => {
  try {
    const mysort = { name: 1 };
    const users = await User.find().sort(mysort);
    res.json(users);
  } catch (err) {
    console.log("get data error", err);
  }
};

//POST DATA

exports.postMembers = async (req, res, next) => {
  const { name, age, email, status } = req.body;
  const tempImage = req.file;

  const image = `./uploads/${tempImage.filename}`;

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
    try {
      await addMember.save();
      return res.status(400).json({ msg: "sucessfully" });
    } catch (err) {
      console.log(err);
    }
  }
};

//Update data from database

exports.updateMembers = async (req, res) => {
  const userId = req.params.id;

  const { name, age, email, status } = req.body;
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    res.json({ msg: "User not found", err });
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
