const express = require("express");
const authcontroller = require("../controllers/authcontroller");
const admincontroller = require("../controllers/admincontroller");
const superadmincontroller = require("../controllers/superadmincontroller");
const anakcontroller = require("../controllers/anakcontroller");
const ibuhamilcontroller = require("../controllers/ibuhamilcontroller");
const pemantauankehamilan = require("../controllers/pemantauankehamilancontroller");
const pemantauannifascontroller = require("../controllers/pemantauannifascontroller");
const pemantauananakcontroller = require("../controllers/pemantauananakcontroller");
const { verifytoken } = require("../middleware/verifytoken");
const { refreshtoken } = require("../controllers/refreshtoken");

const router = express.Router();

// Authentication
router.post("/login", authcontroller.login);
router.delete("/logout", authcontroller.logout);
router.get("/refreshtoken", refreshtoken);

// admin
router.post("/admin", admincontroller.createadmin);

// superadmin
router.post("/superadmin", superadmincontroller.createsuperadmin);

// anak
router.get("/anak", verifytoken, anakcontroller.getanak);
router.post("/anak", verifytoken, anakcontroller.createanak);

// ibuhamil
router.post("/ibuhamil", verifytoken, ibuhamilcontroller.createibuhamil);
router.get("/ibuhamil", verifytoken, ibuhamilcontroller.getibuhamil);

// pemantauan kehamilan
router.post(
  "/kehamilan",
  verifytoken,
  pemantauankehamilan.createpemantauankehamilan
);
router.get(
  "/kehamilan",
  verifytoken,
  pemantauankehamilan.getpemantauankehamilan
);

// Pemantauan nifas
router.post(
  "/nifas",
  verifytoken,
  pemantauannifascontroller.createpemantauannifas
);
router.get(
  "/nifas",
  verifytoken,
  pemantauannifascontroller.getpemantauanknifas
);

// Pemantauan anak
router.post(
  "/pemantauananak",
  verifytoken,
  pemantauananakcontroller.createpemantauananak
);
router.get(
  "/pemantauananak",
  verifytoken,
  pemantauananakcontroller.getpematauananak
);

module.exports = { router };
