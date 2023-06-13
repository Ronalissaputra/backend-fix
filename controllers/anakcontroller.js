const { Anak, Ibuhamil } = require("../models");
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
        nama: {
          [Op.like]: "%" + search + "%",
        },
      };
    } else if (req.userrole === "admin") {
      whereClause = {
        nama: {
          [Op.like]: "%" + search + "%",
        },
        adminId: req.userId,
      };
    } else {
      whereClause = {
        nama: {
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

exports.createanak = async (req, res) => {
  const { ...anakData } = req.body;
  try {
    const anak = await Anak.create({ adminId: req.userId, ...anakData });
    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteanak = async (req, res) => {
  const id = req.params.id;

  try {
    const anak = await Anak.findOne({
      where: {
        id,
      },
    });
    if (!anak) {
      return res.status(404).json({ error: "anak not found" });
    }

    await anak.destroy();

    return res.status(200).json({ message: "Anak deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getanakbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const anak = await Anak.findOne({
      where: {
        id,
      },
    });
    if (!anak) {
      return res.status(404).json({ error: "Anak not found" });
    }
    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateanak = async (req, res) => {
  const id = req.params.id;
  const { ...anakData } = req.body;

  try {
    const anak = await Anak.findOne({
      where: {
        id,
      },
    });
    if (!anak) {
      return res.status(404).json({ error: "anak not found" });
    }

    await anak.update(anakData);

    return res.status(200).json(anak);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
