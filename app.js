const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const { router } = require("./router");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen({ port: 5000 }, async () => {
  console.log("running http://localhost:5000");
  await sequelize.authenticate();
  console.log("database connected.");
});
