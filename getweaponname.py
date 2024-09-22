import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time

# 使用 webdriver_manager 自動管理 EdgeDriver
service = EdgeService(EdgeChromiumDriverManager().install())
driver = webdriver.Edge(service=service)

# 進入全螢幕模式
driver.fullscreen_window()

# 開啟目標網頁
driver.get('https://tracker.gg/valorant/db/weapons/Vandal')

# 等待頁面加載
time.sleep(2)

weapon_names = []

# 獲取所有武器的鏈接
weapon_links = driver.find_elements(By.CSS_SELECTOR, 'a.skin')

# 遍歷所有武器鏈接並抓取名稱
for link in weapon_links:
    # 模擬點擊武器
    link.click()
    #time.sleep(1)  # 等待頁面更新

    # 獲取武器名稱
    weapon_title = driver.find_element(By.CLASS_NAME, 'weapon__name').text
    weapon_names.append(weapon_title)

    # 重新獲取武器的鏈接
    weapon_links = driver.find_elements(By.CSS_SELECTOR, 'a.skin')  # 更新鏈接列表

# 關閉瀏覽器
driver.quit()

# 去除重複的武器名稱
unique_weapon_names = list(set(weapon_names))

# 將武器名稱保存為 JSON 檔案
with open('weapon_names.json', 'w', encoding='utf-8') as f:
    json.dump(unique_weapon_names, f, ensure_ascii=False, indent=4)

print("武器名稱已保存至 weapon_names.json")
