import json
import re

weapon_names = ["Ghost", "Classic", "Frenzy", "Sheriff", "Shorty", "Stinger", "Spectre", 
                "Judge", "Bucky", "Bulldog", "Guardian", "Vandal", "Phantom", "Ares", 
                "Odin", "Outlaw", "Marshal", "Operator", "Melee"]

# 載入資料1 (valorant_skins.json)
with open('ValorantWebsite/public/get_database/database/valorant_skins.json', 'r', encoding='utf-8') as f:
    skins_data = json.load(f)

# 對每一種武器進行處理
for weapon in weapon_names:
    # 載入對應的 weapon_skin JSON 檔案
    weapon_skin_file = f'ValorantWebsite/public/get_database/database/weapon_skin_{weapon}.json'
    with open(weapon_skin_file, 'r', encoding='utf-8') as f:
        weapon_skins_data = json.load(f)

    # 定義一個函數來標準化名稱，去掉標點符號並取得第一個單詞
    def normalize_name(name):
        # 移除標點符號
        cleaned_name = re.sub(r'[^\w\s]', '', name)
        return cleaned_name.split()[0].lower()

    # 開始比對
    for weapon_skin in weapon_skins_data:
        weapon_first_word = normalize_name(weapon_skin["name"])
        for level_data in skins_data:
            for skin in level_data["skins"]:
                skin_first_word = normalize_name(skin["skin"])
                if weapon_first_word == skin_first_word:
                    # 如果比對成功，將 level 添加到 weapon_skin 資料中
                    weapon_skin["level"] = level_data["level"]

    # 將比對後的資料保存回對應的 JSON 文件，覆蓋原有檔案
    with open(weapon_skin_file, 'w', encoding='utf-8') as f:
        json.dump(weapon_skins_data, f, ensure_ascii=False, indent=4)

    print(f"比對完成，結果已保存到 weapon_skin_{weapon}.json")
