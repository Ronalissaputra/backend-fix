const { Notification, Ibuhamil } = require("../models");
const { Op } = require("sequelize");

exports.getnotification = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  try {
    let whereClause;
    if (req.userrole === "superadmin" || req.userrole === "admin") {
      whereClause = {
        title: {
          [Op.like]: "%" + search + "%",
        },
      };
    } else {
      whereClause = {
        title: {
          [Op.like]: "%" + search + "%",
        },
        id: req.userId,
      };
    }

    const { count, rows } = await Notification.findAndCountAll({
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

exports.createnotification = async (req, res) => {
  const { ...notificationData } = req.body;
  try {
    const notification = await Notification.create({ ...notificationData });
    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
  }
};

exports.deletenotification = async (req, res) => {
  const id = req.params.id;

  try {
    const notification = await Notification.findOne({
      where: {
        id,
      },
    });
    if (!notification) {
      return res.status(404).json({ error: "notification not found" });
    }

    await notification.destroy();

    return res
      .status(200)
      .json({ message: "notification deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getnotificationbyid = async (req, res) => {
  const id = req.params.id;
  try {
    const notification = await Notification.findOne({
      where: {
        id,
      },
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatenotification = async (req, res) => {
  const id = req.params.id;
  const { status, values } = req.body;

  try {
    const notification = await Notification.findOne({
      where: {
        id,
      },
    });
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    notification[status] = values;

    await notification.save();

    return res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
