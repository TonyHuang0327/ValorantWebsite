document.addEventListener('DOMContentLoaded', () => {
    // 第一部分：獲取 URL 參數並加載相應的 JSON 資料
    const urlParameter = new URLSearchParams(window.location.search);
    const weaponName = urlParameter.get('weapon');

    fetch(`/get_database/database/weapon_skin_${weaponName}.json`) // 使用正確的相對路徑
        .then(response => response.json())
        .then(data => {
            console.log(data); // 在控制台中打印獲取的資料

            const container = document.getElementById('linkContainer');
            // 遍歷 JSON 數組中的每一個元素
            data.forEach(skin => {
                // 創建新的 <button> 標籤以包裹每個武器皮膚
                const buttonTag = document.createElement('button');
                buttonTag.className = 'skin-button'; // 添加類名

                // 創建 <div> 標籤以包裹圖片和名稱
                const skinDiv = document.createElement('div');
                skinDiv.className = 'skin'; // 添加類名

                // 創建 <img> 標籤
                const imgTag = document.createElement('img');
                imgTag.src = skin.image; // 設置圖片來源
                imgTag.alt = skin.name; // 設置圖片的替代文字

                // 創建 <span> 標籤顯示武器名稱
                const nameSpan = document.createElement('span');
                nameSpan.textContent = skin.name; // 將 JSON 的內容設置為名稱文字
                nameSpan.className = 'skin-name'; // 添加類名以便於 CSS

                // 將圖片和名稱添加到 skinDiv 中
                skinDiv.appendChild(imgTag);
                skinDiv.appendChild(nameSpan);

                // 將 skinDiv 添加到按鈕中
                buttonTag.appendChild(skinDiv);

                // 將按鈕添加到容器中
                container.appendChild(buttonTag);
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });

    // 第二部分：卡片點擊翻轉
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const remainingDaysElement = document.getElementById("remaining-days");
    if (remainingDaysElement) {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const remainingDays = Math.max(0, (lastDayOfMonth - today) / (1000 * 60 * 60 * 24));
        remainingDaysElement.textContent = Math.ceil(remainingDays);
    }
});

