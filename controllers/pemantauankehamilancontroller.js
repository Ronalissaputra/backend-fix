const { Pemantauankehamilan, Ibuhamil } = require("../models");
const { Op } = require("sequelize");

exports.getpemantauankehamilan = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    let whereClause;
    if (req.userrole === "superadmin") {
      whereClause = {
        [Op.or]: [
          {
            status: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      };
    } else if (req.userrole === "admin") {
      whereClause = {
        [Op.or]: [
          {
            status: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
        adminId: req.userId,
      };
    } else {
      whereClause = {
        [Op.or]: [
          {
            status: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
        id: req.userId,
      };
    }

    const { count, rows } = await Pemantauankehamilan.findAndCountAll({
      where: whereClause,
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
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

exports.deletepemantauankehamilan = async (req, res) => {
  const id = req.params.id;

  try {
    const kehamilan = await Pemantauankehamilan.findOne({
      where: {
        id,
      },
    });
    if (!kehamilan) {
      return res.status(404).json({ error: "pemantauan kehamilan not found" });
    }

    await kehamilan.destroy();

    return res
      .status(200)
      .json({ message: "Pemantauan kehamilan deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
