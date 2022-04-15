const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("Member", UserSchema);
