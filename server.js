const express = require("express");
const app = express();
const port = 8080;

// 提供靜態檔案，例如 HTML 和 JSON
app.use(express.static(__dirname + '/public')); // 確保這裡正確指向 public 資料夾

// 路由設定
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html'); // 指向你的 HTML 檔案
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
