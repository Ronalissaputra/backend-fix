const { Admin } = require("../models");
const bcrypt = require("bcrypt");

exports.createadmin = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "password dan confpassword tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);

  try {
    const user = await Admin.create({
      name: name,
      email: email,
      password: hashpassword,
      role: role,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
