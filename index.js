const express = require("express");
const req = require("express/lib/request");
const path = require("path");
const exphbs = require("express-handlebars");
const Logger = require("./middleware/logger");
const mongoose = require("mongoose");
const members = require("./Members");
var cors = require("cors");

const app = express();

//express bhandle bar middlebar

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser for the post method

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/members", require("./routers/api/members"));

app.use(
  "/api/UserSignUpController",
  require("./routers/api/UserSignUpController")
);

app.use("/uploads/", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(
    "mongodb+srv://usman385:11235116@cluster0.dkeb7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log("Server running on port", PORT, "...."));
  })
  .catch((err) => {
    console.log(err);
  });
