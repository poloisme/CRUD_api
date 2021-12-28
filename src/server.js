const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methodOverride = require("method-override");

const initRoute = require("./routes/index");
const connectDB = require("./configs/connectDB");
const errorHandle = require("./middlewares/errorHandle");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

//init route
initRoute(app);
//handle error 404
app.use("*", (req, res) => {
  res.status(404).json("Not found!");
});
//connect db
connectDB();

app.listen(port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});

module.exports = app;
