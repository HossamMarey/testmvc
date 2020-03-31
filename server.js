if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const expressLayoyts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

const app = express();
const DB = process.env.DATABASE_URL;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayoyts);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log("DB connection successful!"));
} catch (error) {
  console.log(error);
}

/////////////////////

app.use("/", indexRouter);

//////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` app listening on port ${port}`));
