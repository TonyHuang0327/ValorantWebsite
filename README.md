# Valorant Website

這是一個展示 Valorant 遊戲中武器和皮膚資料的網站。該專案使用網頁抓取技術，將資料保存並展示在前端頁面上，適合 Valorant 遊戲愛好者和資料分析者。

## 專案目錄結構

- `public/get_database/database/` - JSON 資料庫，包含遊戲中各類武器及其皮膚的詳細資訊。
- `public/get_database` - 包含爬蟲程式碼，用於從 Valorant 官方網站抓取數據。
- `src` - 前端程式碼，負責將資料展示在網站頁面上。
- `README.md` - 專案說明文件（本文件）。

## 功能

- 自動抓取 Valorant 網站中的武器名稱和皮膚資料。
- 支援隨機選擇六把武器並顯示，包含特定的選取規則（例如至少包含兩把 premium 皮膚）。
- 支援全螢幕模式，方便展示和瀏覽武器數據。
- 後端 API 服務，支持使用本地端口 8080 提取 JSON 資料。
- 預留作品集區域，便於展示網站的功能。

## 使用技術

- **前端**：HTML、CSS、JavaScript
- **後端**：Node.js
- **資料抓取**：Selenium 和 Python
- **資料存儲**：JSON 格式資料庫

## 如何運行

1. 克隆專案：

   ```bash
   git clone https://github.com/TonyHuang0327/ValorantWebsite.git
   cd ValorantWebsite

2. 安裝依賴：
   
   ```bash
   npm install
   
4. 啟動後端伺服器：
   ```bash
   node server.js

5. 在瀏覽器中訪問 http://localhost:3000 查看網站。

## 資料更新

如需更新武器和皮膚資料，請運行 public/get_database 內的爬蟲程式碼。此程式會自動避免重複抓取相同的資料。

## 貢獻

歡迎對該專案提出建議或Pull Request。請遵循 GitHub 上的貢獻指南。
