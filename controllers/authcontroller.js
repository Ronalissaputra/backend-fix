const { Superadmin, Admin, Ibuhamil } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    let user = await Superadmin.findAll({ where: { email: req.body.email } });
    let role = "superadmin";

    if (!user || user.length === 0) {
      user = await Admin.findAll({ where: { email: req.body.email } });
      role = "admin";
    }

    if (!user || user.length === 0) {
      user = await Ibuhamil.findAll({ where: { email: req.body.email } });
      role = "pasien";
    }

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ message: "password salah" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const userrole = user[0].role;
    const accesstoken = jwt.sign(
      { userId, name, email, userrole },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshtoken = jwt.sign(
      { userId, name, email, userrole },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    if (role === "superadmin") {
      await Superadmin.update(
        { refresh_token: refreshtoken },
        {
          where: {
            id: userId,
          },
        }
      );
    } else if (role === "admin") {
      await Admin.update(
        { refresh_token: refreshtoken },
        {
          where: {
            id: userId,
          },
        }
      );
    }
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accesstoken });
  } catch (error) {
    return res.status(400).json({ message: "email tidak ditemukan" });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) return res.sendStatus(204);

    let user = await Superadmin.findOne({
      where: {
        refresh_token: refreshtoken,
      },
    });

    if (!user) {
      user = await Admin.findOne({
        where: {
          refresh_token: refreshtoken,
        },
      });
    }

    if (!user) return res.sendStatus(204);

    const userId = user.id;

    if (user instanceof Superadmin) {
      await Superadmin.update(
        {
          refresh_token: null,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    } else if (user instanceof Admin) {
      await Admin.update(
        {
          refresh_token: null,
        },
        {
          where: {
            id: userId,
          },
        }
      );
    }

    res.clearCookie("refreshtoken");
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
