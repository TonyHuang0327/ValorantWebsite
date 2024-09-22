const express = require("express");
const app = express();
const port = 8080;

//引入/weapons.js
const weaponsRouter = require("./router/weapons.js")
const about = require("./router/about.js");

//路由設定 /API設定
app.get("/",(req,res)=>{
    res.send("挖哩");
});

//將/weapons的request送到weaponsRouter
app.use("/weapons",weaponsRouter);
app.use("/about",about);

app.listen(port,()=>{
    console.log(`server is running at localhost:${port}`)
});