const express = require("express");
const router = express.Router();
const { verifytoken } = require("../middleware/verifytoken");
const {
  authcontroller,
  superadmincontroller,
  admincontroller,
  ibuhamilcontroller,
  anakcontroller,
  pemantauananakcontroller,
  pemantauannifascontroller,
  refreshtokencontroller,
  pemantauankehamilancontroller,
} = require("../controllers");

// auth
router.post("/api/login", authcontroller.login);
router.delete("/api/logout", authcontroller.logout);
router.get("/api/refreshtoken", refreshtokencontroller.refreshtoken);

// admin
router
  .route("/api/admin")
  .post(admincontroller.createadmin)
  .get(verifytoken, admincontroller.getadmin);
router
  .route("/api/admin/:id")
  .get(verifytoken, admincontroller.getadminbyid)
  .patch(verifytoken, admincontroller.updateadmin)
  .delete(verifytoken, admincontroller.deleteadmin);

// ibuhamil
router
  .route("/api/ibuhamil")
  .get(verifytoken, ibuhamilcontroller.getibuhamil)
  .post(verifytoken, ibuhamilcontroller.createibuhamil);
router
  .route("/api/ibuhamil/:uuid")
  .get(verifytoken, ibuhamilcontroller.getibuhamilbyid)
  .delete(verifytoken, ibuhamilcontroller.deleteibuhamil)
  .patch(verifytoken, ibuhamilcontroller.updateibuhamil);

// anak
router
  .route("/api/anak")
  .get(verifytoken, anakcontroller.getanak)
  .post(verifytoken, anakcontroller.createanak);
router
  .route("/api/anak/:id")
  .patch(verifytoken, anakcontroller.updateanak)
  .get(verifytoken, anakcontroller.getanakbyid)
  .delete(verifytoken, anakcontroller.deleteanak);

// pemantauan kehamilan
router
  .route("/api/pemantauankehamilan")
  .post(verifytoken, pemantauankehamilancontroller.createpemantauankehamilan)
  .get(verifytoken, pemantauankehamilancontroller.getpemantauankehamilan);
router
  .route("/api/pemantauankehamilan/:id")
  .delete(verifytoken, pemantauankehamilancontroller.deletepemantauankehamilan);

// pemantauan nifas
router
  .route("/api/nifas")
  .post(verifytoken, pemantauannifascontroller.createpemantauannifas)
  .get(verifytoken, pemantauannifascontroller.getpemantauanknifas);

// pemantauan anak
router
  .route("/api/pemantauananak")
  .post(verifytoken, pemantauananakcontroller.createpemantauananak)
  .get(verifytoken, pemantauananakcontroller.getpematauananak);

// superadmin
router.post("/api/superadmin", superadmincontroller.createsuperadmin);

module.exports = { router };
