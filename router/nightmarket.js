const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    // 文件名列表
    const weaponFiles = [
        "weapon_skin_Ares.json",
        "weapon_skin_Bucky.json",
        "weapon_skin_Bulldog.json",
        "weapon_skin_Classic.json",
        "weapon_skin_Frenzy.json",
        "weapon_skin_Guardian.json",
        "weapon_skin_Judge.json",
        "weapon_skin_Marshal.json",
        "weapon_skin_Melee.json",
        "weapon_skin_Odin.json",
        "weapon_skin_Operator.json",
        "weapon_skin_Outlaw.json",
        "weapon_skin_Phantom.json",
        "weapon_skin_Sheriff.json",
        "weapon_skin_Shorty.json",
        "weapon_skin_Spectre.json",
        "weapon_skin_Stinger.json",
        "weapon_skin_Vandal.json",
        "weapon_skin_Ghost.json"
    ];

    // 讀取所有武器數據並合併到一個數組中
    const weaponsData = weaponFiles.flatMap(file => {
        try {
            const filePath = path.join(__dirname, "../public/get_database/database", file);
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch (err) {
            console.error(`Error reading file ${file}:`, err);
            return [];
        }
    });

    // 過濾掉不符合條件的武器
    const filteredWeapons = weaponsData.filter(weapon => 
        weapon.level !== "battle pass" &&
        weapon.level !== "Exclusive" &&
        weapon.level !== "Ultra" &&
        weapon.level !== "time-limited" &&
        weapon.level !== undefined
    );

    // 將 Premium 和非 Premium 武器分開
    const premiumWeapons = filteredWeapons.filter(weapon => weapon.level === "Premium");
    const nonPremiumWeapons = filteredWeapons.filter(weapon => weapon.level !== "Premium");

    const selectedWeapons = [];
    const weaponCount = {};

    // 確保至少有兩把 Premium 武器
    for (let i = 0; i < 2 && premiumWeapons.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * premiumWeapons.length);
        const selectedWeapon = premiumWeapons.splice(randomIndex, 1)[0];

        // 記錄每種武器的數量
        const weaponType = selectedWeapon.name.split(" ")[0];
        weaponCount[weaponType] = (weaponCount[weaponType] || 0) + 1;
        selectedWeapons.push(selectedWeapon);
    }

    // 繼續從非 Premium 武器中選擇，直到達到 6 把
    while (selectedWeapons.length < 6) {
        const availableWeapons = [...premiumWeapons, ...nonPremiumWeapons];

        // 隨機選擇武器
        const randomIndex = Math.floor(Math.random() * availableWeapons.length);
        const selectedWeapon = availableWeapons.splice(randomIndex, 1)[0];

        const weaponType = selectedWeapon.name.split(" ")[0];
        weaponCount[weaponType] = (weaponCount[weaponType] || 0) + 1;

        // 檢查該武器類型是否超過三個
        if (weaponCount[weaponType] <= 3) {
            selectedWeapons.push(selectedWeapon);

            // 從對應的列表中移除選中的武器
            const removeIndex = premiumWeapons.findIndex(w => w.name === selectedWeapon.name);
            if (removeIndex !== -1) {
                premiumWeapons.splice(removeIndex, 1);
            } else {
                const nonPremiumRemoveIndex = nonPremiumWeapons.findIndex(w => w.name === selectedWeapon.name);
                nonPremiumWeapons.splice(nonPremiumRemoveIndex, 1);
            }
        } else {
            // 如果超過三個，撤銷計數器更新
            weaponCount[weaponType]--;
        }
    }

    // 將選擇的武器資料轉換成 HTML 格式並插入到頁面中
    const cardsHtml = selectedWeapons.map(weapon => {

        // 根據 level 決定邊框顏色
    let borderColor;
    switch (weapon.level) {
        case "Premium":
            borderColor = "#D1548D"; // 高級顏色
            break;
        case "Exclusive":
            borderColor = "#4CAF50"; // 獨占顏色
            break;
        case "Select":
            borderColor = "#5A9FE2"; // 選擇顏色
            break;
        case "Deluxe":
            borderColor = "#018B80"; // 豪華顏色
            break;
        default:
            borderColor = "#D1548D"; // 默認顏色
            break;
    }

        // 根據 level 決定背景圖像
        let backgroundImage;
        switch (weapon.level) {
            case "Premium":
                backgroundImage = "../icon/premium.png";
                break;
            case "Exclusive":
                backgroundImage = "../icon/exclusive.png";
                break;
            case "Select":
                backgroundImage = "../icon/select.png";
                break;
            case "Deluxe":
                backgroundImage = "../icon/deluxe.png";
                break;
        }

        // 根據 level 決定對應的圖片
        let levelImage;
        switch (weapon.level) {
            case "Premium":
                levelImage = "../icon/PE.png";
                break;
            case "Select":
                levelImage = "../icon/SE.png";
                break;
            case "Deluxe":
                levelImage = "../icon/DE.png";
                break;
        }

        // 根據 level 決定價格
        let price;
        switch (weapon.level) {
            case "Premium":
                price = 1775;
                break;
            case "Deluxe":
                price = 1275;
                break;
            case "Select":
                price = 875;
                break;
            default:
                price = 0;
        }

        // 計算隨機折扣（10% 到 50% 之間）
        const discountPercentage = Math.floor(Math.random() * 41) + 10;
        const discountedPrice = Math.floor(price * (1 - discountPercentage / 100));

        // 格式化價格
        const formattedPrice = price.toLocaleString();
        const formattedDiscountedPrice = discountedPrice.toLocaleString();

        return `
            <div class="card">
                <div class="card-inner">
                    <div class="card-front" style="box-shadow: inset 0 0 0 1px ${borderColor};">
                        <div class="image-container">
                            <img id="skinImage" src="${weapon.image}" alt="skin">
                        </div>
                        <p class = "skinName">${weapon.name}</p><br>
                        <img id="levelImage" src="${levelImage}" alt="${weapon.level}">
                        <p class="price">${formattedPrice}</p>
                        <p class="disPercent">-${discountPercentage}%</p>
                        <p class="disPrice">${formattedDiscountedPrice}</p>
                    </div>
                    <div class="card-back" style="background-image: url('${backgroundImage}');"></div>
                </div>
            </div>
        `;
    }).join("");

    res.send(`<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valorant night market simulator</title>
    <link rel="stylesheet" href="/style.css">
    <script defer src="/script.js"></script>
</head>
<body class="nightmarket">
<h1 class="nightmarket">夜市</h1>
<h2 class="nightmarket">剩餘時間: <span id="remaining-days"></span> 天</h2>
    <div class="card-container">
        ${cardsHtml}
    </div>
</body>
</html>`);
});

module.exports = router;
