const { Superadmin, Admin, Ibuhamil } = require("../models");
const jwt = require("jsonwebtoken");

exports.refreshtoken = async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  try {
    if (!refreshtoken) return res.sendStatus(401);
    let user = await Superadmin.findAll({
      where: {
        refresh_token: refreshtoken,
      },
    });
    if (!user || user.length === 0) {
      user = await Admin.findAll({
        where: {
          refresh_token: refreshtoken,
        },
      });
    }

    if (!user || user.length === 0) {
      user = await Ibuhamil.findAll({
        where: {
          refresh_token: refreshtoken,
        },
      });
    }

    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(401);
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const userrole = user[0].role;
        const accesstoken = jwt.sign(
          { userId, name, email, userrole },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accesstoken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
