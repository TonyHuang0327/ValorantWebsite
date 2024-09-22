//建立router
const express = require("express");
const router = express.Router(); //產生router物件

router.get("/",(req,res)=>{
    res.send("/weapons路徑");
});

router.get("/vandal",(req,res)=>{
    res.send("/weapons/vandal路徑");
});

//將router導出,等別人request
module.exports = router;