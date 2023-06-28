const {
  Ibuhamil,
  Anak,
  Pemantauannifas,
  Pemantauananak,
  Pemantauankehamilan,
  Notification,
} = require("../models");
const { Op } = require("sequelize");
const argon2 = require("argon2");

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
    });

    const totalRows = count;
    const totalPage = Math.ceil(totalRows / limit);

    const promises = rows.map(async (ibuhamil) => {
      const [
        anak,
        pemantauannifas,
        pemantauankehamilan,
        pemantauananak,
        notification,
      ] = await Promise.all([
        Anak.findOne({ where: { ibuhamilId: ibuhamil.id } }),
        Pemantauananak.findOne({ where: { ibuhamilId: ibuhamil.id } }),
        Pemantauannifas.findOne({ where: { ibuhamilId: ibuhamil.id } }),
        Pemantauankehamilan.findOne({ where: { ibuhamilId: ibuhamil.id } }),
        Notification.findOne({ where: { ibuhamilId: ibuhamil.id } }),
      ]);

      return {
        ...ibuhamil.toJSON(),
        Pemantauananak: pemantauananak,
        Pemantauankehamilan: pemantauankehamilan,
        Pemantauannifas: pemantauannifas,
        Notification: notification,
        Anak: anak,
      };
    });

    // Jalankan semua promise secara paralel
    const response = await Promise.all(promises);

    return res.status(200).json({
      response: response,
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

exports.createibuhamil = async (req, res) => {
  const { password, ...ibuhamilData } = req.body;
  const hashpassword = await argon2.hash(password);
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
      const hashpassword = await argon2.hash(password);
      ibuhamilData.password = hashpassword;
    }

    await ibuhamil.update(ibuhamilData);

    return res.status(200).json(ibuhamil);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
