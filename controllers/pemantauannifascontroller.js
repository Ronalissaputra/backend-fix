const { Pemantauannifas } = require("../models");

exports.getpemantauanknifas = async (req, res) => {
  try {
    let response;
    if (req.userrole === "superadmin") {
      response = await Pemantauannifas.findAll();
    } else if (req.userrole === "admin") {
      response = await Pemantauannifas.findAll({
        where: {
          adminId: req.userId,
        },
      });
    } else {
      response = await Pemantauannifas.findOne({
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

exports.createpemantauannifas = async (req, res) => {
  const { ...pemantauannifasData } = req.body;
  try {
    const nifas = await Pemantauannifas.create({
      adminId: req.userId,
      ...pemantauannifasData,
    });
    return res.status(200).json(nifas);
  } catch (error) {
    console.log(error);
  }
};
