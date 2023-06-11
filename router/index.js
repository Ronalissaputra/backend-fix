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

router.post("/api/login", authcontroller.login);
router.delete("/api/logout", authcontroller.logout);
router.get("/api/refreshtoken", refreshtokencontroller.refreshtoken);

router.post("/api/admin", admincontroller.createadmin);
router.get("/api/admin", admincontroller.getadmin);

router.post("/api/superadmin", superadmincontroller.createsuperadmin);

// anak
router
  .route("api/anak")
  .get(verifytoken, anakcontroller.getanak)
  .post(verifytoken, anakcontroller.createanak);

// ibuhamil
router
  .route("/api/ibuhamil")
  .get(verifytoken, ibuhamilcontroller.getibuhamil)
  .post(verifytoken, ibuhamilcontroller.createibuhamil);
router
  .route("/api/ibuhamil/:id")
  .get(verifytoken, ibuhamilcontroller.getibuhamilbyid)
  .delete(verifytoken, ibuhamilcontroller.deleteibuhamil)
  .patch(verifytoken, ibuhamilcontroller.updateibuhamil);

// pemantauan kehamilan
router
  .route("/api/kehamilan")
  .post(verifytoken, pemantauankehamilancontroller.createpemantauankehamilan)
  .get(verifytoken, pemantauankehamilancontroller.getpemantauankehamilan);

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

module.exports = { router };
