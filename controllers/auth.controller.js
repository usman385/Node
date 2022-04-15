const rfr = require("rfr");
const { Member } = rfr("/models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//SignUp

exports.signUp = async (req, res, next) => {
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
  const addUser = new Member({
    name,
    email,
    password,
  });

  try {
    await addUser.save();
    let token = jwt.sign(
      { userId: addUser._id, email: addUser.email },
      "dont-show-this"
    );

    console.log("token", token);

    return res.json({ msg: `SignUp SuccesFully`, name, token });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Signup failled due to some reasons",
    });
  }
};

//Login

exports.login = async (req, res, next) => {
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
        userId: existingUser._id,
      },
      "dont-show-this"
    );
    res.status(201).json({
      data: {
        userId: existingUser._id,
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

//Reset password

exports.resetPassword = async (req, res, next) => {
  try {
    const data = crypto.randomBytes(32, async (error, Buffer) => {
      if (error) {
        console.log("first err====", error);
      }

      const token = Buffer.toString("hex");

      let user;

      user = await Member.findOne({ email: req.body.email });
      if (!user) {
        return res.json("User not found");
      }
      console.log("user data", user);
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;

      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "609a39288356e1",
          pass: "472b5647b2da93",
        },
      });
      // console.log({ transport });
      const check = await transport.sendMail({
        to: user.email,
        from: "no-reply@gmail.com",
        subject: "Reset Password",
        html: `<p>To reset your password, complete this form:</p>
           <h4><b>Click the <a href = "${process.env.SERVER_URI}Reset/${token}">Link</a> 
           to Reset Password</b></h4>`,
      });

      await user.save();

      res.json({ msg: "Check your Email...." });
    });
  } catch (error) {
    res.json({ msg: "Some thing went wrong" });
  }
};

//set new password

exports.updatePassword = async (req, res, next) => {
  const { password, confirmpass, token } = req.body;

  try {
    let user;
    user = await Member.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(422).json({ msg: "Password not updated" });
    }
    user.password = password;
    user.confirmpass = confirmpass;

    await user.save();
    return res.json({ msg: `Password Updated Successfully`, user });
  } catch (error) {
    console.log("error", error);
    return res
      .status(402)
      .json({ msg: "Something went wrong please try again..." });
  }
};
