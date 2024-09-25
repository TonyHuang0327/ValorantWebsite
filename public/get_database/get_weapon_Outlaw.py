
import json
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time

# 使用 webdriver_manager 自動管理 EdgeDriver
service = EdgeService(EdgeChromiumDriverManager().install())
driver = webdriver.Edge(service=service)

# 將瀏覽器窗口最大化
driver.maximize_window()

# 開啟目標網頁
driver.get('https://tracker.gg/valorant/db/weapons/Outlaw')

# 等待頁面加載
time.sleep(1)

weapon_data = []  # 用來存儲武器名稱和圖片的資料

# 獲取所有武器的鏈接
weapon_links = driver.find_elements(By.CSS_SELECTOR, 'a.skin')

# 遍歷所有武器鏈接並抓取名稱
for link in weapon_links:
    link.click()
    #time.sleep(1)  # 確保頁面有足夠時間加載

    # 獲取武器名稱
    weapon_title = driver.find_element(By.CLASS_NAME, 'weapon__name').text

    # 獲取武器圖片
    weapon_image = driver.find_element(By.CLASS_NAME, 'weapon__image').get_attribute('src')

    # 將武器名稱和圖片作為字典添加到 weapon_data 列表中
    weapon_data.append({'name': weapon_title, 'image': weapon_image})

    # 重新獲取武器的鏈接
    weapon_links = driver.find_elements(By.CSS_SELECTOR, 'a.skin')  # 更新鏈接列表

# 關閉瀏覽器
driver.quit()

# 確保資料夾存在
os.makedirs('database', exist_ok=True)

# 將武器名稱保存為 JSON 檔案到 database 資料夾
with open('database/weapon_skin_Outlaw.json', 'w', encoding='utf-8') as f:
    json.dump(weapon_data, f, ensure_ascii=False, indent=4)

print("武器名稱已保存至 database/weapon_skin_Outlaw.json")
