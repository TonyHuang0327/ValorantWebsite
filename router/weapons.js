//建立router
const express = require("express");
const router = express.Router(); //產生router物件

router.get("/",(req,res)=>{
    res.send(`
        <h1>Weapons Page</h1>
        <p><a href="/weapons/vandal">暴徒</a></p>
    `);
});

router.get("/vandal",(req,res)=>{
    res.send("/weapons/vandal路徑");
});

//將router導出,等別人request
module.exports = router;