const { Pemantauananak } = require("../models");

exports.getpematauananak = async (req, res) => {
  try {
    let response;
    if (req.userrole === "superadmin") {
      response = await Pemantauananak.findAll();
    } else if (req.userrole === "admin") {
      response = await Pemantauananak.findAll({
        where: {
          adminId: req.userId,
        },
      });
    } else {
      response = await Pemantauananak.findOne({
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

exports.createpemantauananak = async (req, res) => {
  const { ...anakData } = req.body;
  try {
    const anak = await Pemantauananak.create({
      adminId: req.userId,
      ...anakData,
    });
    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
  }
};
