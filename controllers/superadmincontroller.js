const { Superadmin } = require("../models");
const argon2 = require("argon2");

exports.createsuperadmin = async (req, res) => {
  const { nama, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "password dan confpassword tidak cocok" });
  const hashpassword = await argon2.hash(password);

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
