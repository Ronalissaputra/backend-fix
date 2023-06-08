const { Ibuhamil, Anak } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.getibuhamil = async (req, res) => {
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
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      };
    } else if (req.userrole === "admin") {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
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
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
        id: req.userId,
      };
    }

    const { count, rows } = await Ibuhamil.findAndCountAll({
      where: whereClause,
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      include: [Anak],
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

exports.deleteibuhamil = async (req, res) => {
  const ibuhamilId = req.params.id;

  try {
    const ibuhamil = await Ibuhamil.findByPk(ibuhamilId);
    if (!ibuhamil) {
      return res.status(404).json({ error: "Ibu hamil not found" });
    }

    await ibuhamil.destroy();

    return res.status(200).json({ message: "Ibu hamil deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getibuhamilbyid = async (req, res) => {
  const ibuhamilId = req.params.id;

  try {
    const ibuhamil = await Ibuhamil.findByPk(ibuhamilId, {
      include: [Anak],
    });

    if (!ibuhamil) {
      return res.status(404).json({ error: "Ibu hamil not found" });
    }

    return res.status(200).json(ibuhamil);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
