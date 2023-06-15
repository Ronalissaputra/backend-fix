const { Superadmin } = require("../models");
const bcrypt = require("bcrypt");

exports.createsuperadmin = async (req, res) => {
  const { nama, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "password dan confpassword tidak cocok" });
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);

  try {
    const superadmin = await Superadmin.create({
      nama: nama,
      email: email,
      password: hashpassword,
      role: role,
    });
    return res.status(200).json(superadmin);
  } catch (error) {
    console.log(error);
  }
};
