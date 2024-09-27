const weapon = ["Ghost", "Classic", "Frenzy", "Sheriff", "Shorty", "Stinger", 
    "Spectre", "Judge", "Bucky", "Bulldog", "Guardian", "Vandal", 
    "Phantom", "Ares", "Odin", "Outlaw", "Marshal", "Operator", "Melee"];

const container = document.getElementById('linkContainer');

weapon.forEach((weaponName) => {
    const imagePath = `/get_database/database/weapon_image/${weaponName}.jpg`;
    const weapon_button = document.createElement('button');
    weapon_button.className = 'skin-button';

    const weapon_div = document.createElement('div');
    weapon_div.className = 'skin';

    const weaponImg = document.createElement('img');
    weaponImg.src = imagePath;
    weaponImg.alt = weaponName; // 設置圖片的替代文字

    const nameSpan = document.createElement('span');
    nameSpan.textContent = weaponName;
    nameSpan.className = 'skin-name';

    weapon_div.appendChild(weaponImg);
    weapon_div.appendChild(nameSpan);

    weapon_button.appendChild(weapon_div);

    container.appendChild(weapon_button);

    //跳轉頁面
    weapon_button.addEventListener('click',() =>{
        window.location.href=`loadScript.html?weapon=${weaponName}`;
    });
});
