const rfr = require("rfr");
const Member = rfr("/module/UserSignup");

//SignUp

exports.SignUp = async (req, res, next) => {
  console.log("jkasjkdsjk");
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Member.findOne({ email: email });
    console.log("test", existingUser);
  } catch (error) {
    res.status(400).json({ msg: "SignUp Failed", error });
  }
  if (existingUser) {
    return res.status(422).json({ msg: "User Already SignUp" });
  }
  console.log({ name, email, password });
  const AddUser = new Member({
    name,
    email,
    password,
  });

  try {
    await AddUser.save();
    let token = jwt.sign(
      { userId: AddUser.id, email: AddUser.email },
      "dont-show-this",
      { expiresIn: "1hr" }
    );
    return res.json({ msg: `SignUp SuccesFully`, name, token });
  } catch (err) {
    console.log(err);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: AddUser.id, email: AddUser.email },
      "dont-show-this",
      { expiresIn: "1hr" }
    );
  } catch (error) {
    return res.status(422).json({ msg: "User Already SignUp", error });
  }
  return res
    .status(201)
    .json({ userId: AddUser.id, email: AddUser.email, token: token });
};

//Login

exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await Member.findOne({ email: email });
  } catch (error) {
    res.status(400).json({ msg: "SignUp Failed", error });
  }
  if (!existingUser || existingUser.password !== password) {
    return res.status(422).json({ msg: "Login Failled333" });
  }
  let token = jwt.sign(
    {
      userId: existingUser.id,
      email: existingUser.email,
      password: existingUser.password,
    },
    "dont-show-this",
    { expiresIn: "1hr" }
  );
  res.status(201).json({
    userId: existingUser.id,
    email: existingUser.email,
    password: existingUser.password,
    token: token,
  });
  return res.json({ msg: `Login SuccesFully` });
};
