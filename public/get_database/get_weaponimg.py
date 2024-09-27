import json
import os
import requests
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

driver.get('https://tracker.gg/valorant/db/weapons')

time.sleep(1)

weaponimg_url = []

# 獲取武器圖片
weapon_images = driver.find_elements(By.CLASS_NAME, 'weapon__image')

# 遍歷所有圖片元素，提取圖片鏈接
for index, image in enumerate(weapon_images):
    img_url = image.get_attribute('src')  # 獲取圖片的 src 屬性
    weaponimg_url.append(img_url)

    # 下載圖片
    img_data = requests.get(img_url).content
    with open(f'ValorantWebsite/public/get_database/database/weapon_image/weapon_{index + 1}.jpg', 'wb') as handler:
        handler.write(img_data)  # 將圖片保存到本地

    print(f'下載圖片: weapon_{index + 1}.jpg')

# 關閉瀏覽器
driver.quit()
