const { Ibuhamil, Admin } = require("../models");
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
            nama: {
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
            nama: {
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
            nama: {
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
      include: Admin,
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
  const uuid = req.params.uuid;

  try {
    const ibuhamil = await Ibuhamil.findOne({
      where: {
        uuid,
      },
    });
    if (!ibuhamil) {
      return res.status(404).json({ error: "Ibu hamil not found" });
    }

    await ibuhamil.destroy();

    return res.status(200).json({ message: "Ibuhamil deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getibuhamilbyid = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const ibuhamil = await Ibuhamil.findOne({
      where: {
        uuid,
      },
      attributes: { exclude: ["password"] },
    });

    if (!ibuhamil) {
      return res.status(404).json({ error: "Ibu hamil not found" });
    }
    const response = {
      ...ibuhamil.toJSON(),
      password: req.query.includePassword ? ibuhamil.password : undefined,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateibuhamil = async (req, res) => {
  const uuid = req.params.uuid;
  const { password, ...ibuhamilData } = req.body;

  try {
    const ibuhamil = await Ibuhamil.findOne({
      where: {
        uuid,
      },
    });
    if (!ibuhamil) {
      return res.status(404).json({ error: "Ibu hamil not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashpassword = await bcrypt.hash(password, salt);
      ibuhamilData.password = hashpassword;
    }

    await ibuhamil.update(ibuhamilData);

    return res.status(200).json(ibuhamil);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
