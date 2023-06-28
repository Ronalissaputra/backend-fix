const { Admin } = require("../models");
const { Op } = require("sequelize");
const argon2 = require("argon2");

exports.createadmin = async (req, res) => {
  const { password, confPassword, ...adminData } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "password dan confpassword tidak cocok" });
  try {
    const hashpassword = await argon2.hash(password);
    const user = await Admin.create({ password: hashpassword, ...adminData });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getadmin = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    const whereClause = {
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

    const { count, rows } = await Admin.findAndCountAll({
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

exports.getadminbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await Admin.findOne({
      where: {
        id,
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const response = {
      ...admin.toJSON(),
      password: req.query.includePassword ? admin.password : undefined,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateadmin = async (req, res) => {
  const id = req.params.id;
  const { password, ...adminData } = req.body;

  try {
    const admin = await Admin.findOne({
      where: {
        id,
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (password) {
      const hashpassword = await argon2.hash(password);
      adminData.password = hashpassword;
    }

    await admin.update(adminData);

    return res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteadmin = async (req, res) => {
  const id = req.params.id;

  try {
    const admin = await Admin.findOne({
      where: {
        id,
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    await admin.destroy();

    return res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
