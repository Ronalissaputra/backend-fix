const { Admin } = require("../models");
const bcrypt = require("bcrypt");

exports.createadmin = async (req, res) => {
  const { password, confPassword, ...adminData } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "password dan confpassword tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    const user = await Admin.create({ password: hashpassword, ...adminData });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.getadmin = async (req, res) => {
  try {
    const response = await Admin.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
