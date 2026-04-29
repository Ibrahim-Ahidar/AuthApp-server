const express = require("express");
const router = express.Router();

const logoutControler = require("../controler/logoutControler");

router.get("/" , logoutControler.handlelogout)

module.exports = router;