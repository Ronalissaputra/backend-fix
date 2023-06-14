const jwt = require("jsonwebtoken");

exports.verifytoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    req.nama = decoded.nama;
    req.email = decoded.email;
    req.userrole = decoded.userrole;
    next();
  });
};
