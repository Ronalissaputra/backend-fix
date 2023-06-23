const express = require("express");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { router } = require("./router");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen({ port: 5000 }, async () => {
  console.log("running http://localhost:5000");
  await sequelize.authenticate();
  console.log("database connected.");
});
