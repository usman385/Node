const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MembersSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String, required: true },
});
module.exports = mongoose.model("User", MembersSchema);
