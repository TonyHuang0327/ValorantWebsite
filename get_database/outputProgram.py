import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time
import os

# 定義武器名稱列表
weapon_names = ["Ghost","Classic","Frenzy","Sheriff","Shorty","Stinger","Spectre","Judge","Bucky","Bulldog","Guardian","Vandal","Phantom","Ares","Odin","Outlaw","Marshal","Operator","Melee"]

# 用來儲存每個武器程式碼的模板
template_code = """
import json
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options  # 新增這一行
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time

# 使用 webdriver_manager 自動管理 EdgeDriver
service = EdgeService(EdgeChromiumDriverManager().install())
driver = webdriver.Edge(service=service)

# 將瀏覽器窗口最大化
driver.maximize_window()


# 開啟目標網頁
driver.get('https://tracker.gg/valorant/db/weapons/{weapon_name}')

# 等待頁面加載
time.sleep(2)

weapon_names = []

# 獲取所有武器的鏈接
weapon_links = driver.find_elements(By.CSS_SELECTOR, 'a.skin')

# 遍歷所有武器鏈接並抓取名稱
for link in weapon_links:
    # 模擬點擊武器
    link.click()
    #time.sleep()  # 等待頁面更新

    # 獲取武器名稱
    weapon_title = driver.find_element(By.CLASS_NAME, 'weapon__name').text
    weapon_names.append(weapon_title)

    # 重新獲取武器的鏈接
    weapon_links = driver.find_elements(By.CSS_SELECTOR, 'a.skin')  # 更新鏈接列表

# 關閉瀏覽器
driver.quit()

# 去除重複的武器名稱
unique_weapon_names = list(set(weapon_names))

# 確保資料夾存在
os.makedirs('database', exist_ok=True)

# 將武器名稱保存為 JSON 檔案到 database 資料夾
with open('database/weapon_skin_{weapon_name}.json', 'w', encoding='utf-8') as f:
    json.dump(unique_weapon_names, f, ensure_ascii=False, indent=4)

print("武器名稱已保存至 database/weapon_skin_{weapon_name}.json")

"""

# 為每個武器名稱生成一個檔案
for weapon in weapon_names:
    weapon_code = template_code.format(weapon_name=weapon)
    with open(f'get_weapon_{weapon}.py', 'w', encoding='utf-8') as f:
        f.write(weapon_code)

print("所有武器程式碼檔案已生成。")
