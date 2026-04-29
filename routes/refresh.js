const express = require("express");
const router = express.Router();

const refreshTokenController = require("../controler/refreshTokenControler");

router.get("/" , refreshTokenController.handleRefreshToken)

module.exports = router;