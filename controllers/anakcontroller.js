const { Anak } = require("../models");

exports.getanak = async (req, res) => {
  try {
    let response;
    if (req.userrole === "superadmin") {
      response = await Anak.findAll();
    } else {
      response = await Anak.findAll({
        where: {
          adminId: req.userId,
        },
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

exports.createanak = async (req, res) => {
  const { name } = req.body;
  try {
    const anak = await Anak.create({
      name: name,
      adminId: req.userId,
    });
    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
  }
};
