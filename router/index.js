const express = require("express");
const { verifytoken } = require("../middleware/verifytoken");
const { refreshtoken } = require("../controllers/refreshtoken");
const { login, logout } = require("../controllers/authcontroller");
const { createadmin } = require("../controllers/admincontroller");
const { createsuperadmin } = require("../controllers/superadmincontroller");
const { getanak, createanak } = require("../controllers/anakcontroller");

const router = express.Router();

router.post("/login", login);
router.post("/admin", createadmin);
router.post("/superadmin", createsuperadmin);
router.delete("/logout", logout);

router.get("/anak", verifytoken, getanak);
router.post("/anak", verifytoken, createanak);

module.exports = { router };
