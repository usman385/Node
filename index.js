const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const Logger = require("./middleware/logger");
const mongoose = require("mongoose");
const cors = require("cors");
dotEnv = require("dotenv");

dotEnv.config();

const app = express();

//express bhandle bar middlebar

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser for the post method

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(Logger());

app.use(cors());

app.use("/api", require("./routes"));

// app.use("/api/authRoute", require("./routes/auth.route"));

app.use("/uploads/", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log("Server running on port", PORT, "...."));
  })
  .catch((err) => {
    console.log(err);
  });
