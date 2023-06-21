const { Pemantauannifas, Ibuhamil } = require("../models");
const { Op } = require("sequelize");

exports.getpemantauannifas = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    let whereClause;
    if (req.userrole === "superadmin") {
      whereClause = {
        status: {
          [Op.like]: "%" + search + "%",
        },
      };
    } else if (req.userrole === "admin") {
      whereClause = {
        status: {
          [Op.like]: "%" + search + "%",
        },
        adminId: req.userId,
      };
    } else {
      whereClause = {
        status: {
          [Op.like]: "%" + search + "%",
        },
        id: req.userId,
      };
    }

    const { count, rows } = await Pemantauannifas.findAndCountAll({
      where: whereClause,
      offset: offset,
      limit: limit,
      order: [["status", "ASC"]],
      include: Ibuhamil,
    });

    const totalRows = count;
    const totalPage = Math.ceil(totalRows / limit);

    return res.status(200).json({
      response: rows,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
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

exports.deletepemantauannifas = async (req, res) => {
  const id = req.params.id;

  try {
    const nifas = await Pemantauannifas.findOne({
      where: {
        id,
      },
    });
    if (!nifas) {
      return res.status(404).json({ error: "pemantauan nifas not found" });
    }

    await nifas.destroy();

    return res
      .status(200)
      .json({ message: "Pemantauan nifas deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
