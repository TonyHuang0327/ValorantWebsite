const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("這是/about的router");
});

module.exports = router;