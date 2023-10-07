const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes=require("./account")
const userRoutes=require("./User.js");

router.use(userRoutes);
router.use(accountRoutes)

module.exports = router;