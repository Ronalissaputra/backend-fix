const { Anak } = require("../models");
const { Op } = require("sequelize");

exports.getanak = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    let whereClause;
    if (req.userrole === "superadmin") {
      whereClause = {
        nama_anak: {
          [Op.like]: "%" + search + "%",
        },
      };
    } else if (req.userrole === "admin") {
      whereClause = {
        nama_anak: {
          [Op.like]: "%" + search + "%",
        },
        adminId: req.userId,
      };
    } else {
      whereClause = {
        nama_anak: {
          [Op.like]: "%" + search + "%",
        },
        id: req.userId,
      };
    }

    const { count, rows } = await Anak.findAndCountAll({
      where: whereClause,
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
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

exports.createanak = async (req, res) => {
  const { ...anakData } = req.body;
  try {
    const anak = await Anak.create({ adminId: req.userId, ...anakData });
    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
  }
};
