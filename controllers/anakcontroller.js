const { Anak } = require("../models");

exports.getanak = async (req, res) => {
  try {
    let response;
    if (req.userrole === "superadmin") {
      response = await Anak.findAll();
    } else if (req.userrole === "admin") {
      response = await Anak.findAll({
        where: {
          adminId: req.userId,
        },
      });
    } else {
      response = await Anak.findOne({
        where: {
          id: req.userId,
        },
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

exports.createanak = async (req, res) => {
  const { ...anakData } = req.body;
  try {
    const anak = await Anak.create({ adminId: req.userId, ...anakData });
    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
  }
};
