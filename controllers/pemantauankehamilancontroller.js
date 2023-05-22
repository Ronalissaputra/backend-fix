const { Pemantauankehamilan } = require("../models");

exports.getpemantauankehamilan = async (req, res) => {
  try {
    let response;
    if (req.userrole === "superadmin") {
      response = await Pemantauankehamilan.findAll();
    } else if (req.userrole === "admin") {
      response = await Pemantauankehamilan.findAll({
        where: {
          adminId: req.userId,
        },
      });
    } else {
      response = await Pemantauankehamilan.findOne({
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

exports.createpemantauankehamilan = async (req, res) => {
  const { ...pemantauankehamilanData } = req.body;
  try {
    const nifas = await Pemantauankehamilan.create({
      adminId: req.userId,
      ...pemantauankehamilanData,
    });
    return res.status(200).json(nifas);
  } catch (error) {
    console.log(error);
  }
};
