const rfr = require("rfr");
const Member = rfr("/module/UserSignup");
const jwt = require("jsonwebtoken");

//SignUp

exports.SignUp = async (req, res, next) => {
  console.log("jkasjkdsjk");
  const { name, email, password, confirmpass } = req.body;
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
  console.log({ name, email, password, confirmpass });
  const AddUser = new Member({
    name,
    email,
    password,
    confirmpass,
  });

  try {
    await AddUser.save();
    let token = jwt.sign(
      { userId: AddUser._id, email: AddUser.email },
      "dont-show-this"
    );
    return res.json({ msg: `SignUp SuccesFully`, name, token });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Signup failled due to some reasons",
    });
  }
};

//Login

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let existingUser;
    try {
      existingUser = await Member.findOne({ email: email });
      console.log("login user", existingUser);
    } catch (error) {
      return res.status(400).json({ msg: "SignUp Failed", error });
    }
    if (!existingUser || existingUser.password !== password) {
      console.log("f3f3f4S");
      return res.status(422).json({ msg: "Login Failled..." });
    }
    let token = jwt.sign(
      {
        userId: existingUser.id,
      },
      "dont-show-this"
    );
    res.status(201).json({
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
      msg: `Login SuccesFully`,
    });
  } catch (err) {
    console.log("err", err);
    res.json({
      msg: "Something Went wrong",
    });
  }
  // return res.json();
};
