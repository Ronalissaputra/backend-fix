const { Ibuhamil, Anak } = require("../models");
const bcrypt = require("bcrypt");

exports.getibuhamil = async (req, res) => {
  try {
    let response;
    if (req.userrole === "superadmin") {
      response = await Ibuhamil.findAll({
        include: [Anak],
      });
    } else if (req.userrole === "admin") {
      response = await Ibuhamil.findAll({
        where: {
          adminId: req.userId,
        },
        include: [Anak],
      });
    } else {
      response = await Ibuhamil.findOne({
        where: {
          id: req.userId,
        },
        include: [Anak],
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

exports.createibuhamil = async (req, res) => {
  const { password, ...ibuhamilData } = req.body;
  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);
  try {
    const ibuhamil = await Ibuhamil.create({
      password: hashpassword,
      adminId: req.userId,
      ...ibuhamilData,
    });
    return res.status(200).json(ibuhamil);
  } catch (error) {
    console.log(error);
  }
};
