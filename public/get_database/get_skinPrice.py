from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.edge.options import Options
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import json

# 設定 Edge 選項
edge_options = Options()
edge_options.add_argument("--headless")  # 如果不想顯示瀏覽器，可以啟用這一行

# 使用 Edge 驅動程式
service = EdgeService(EdgeChromiumDriverManager().install())
driver = webdriver.Edge(service=service, options=edge_options)

# 瀏覽器打開指定網址
driver.get('https://www.pcgamesn.com/valorant/skins')

# 等待一段時間以確保頁面加載完成
#driver.implicitly_wait(5)  # 隱式等待，確保頁面加載完成

# 找出所有的 <h2>, <h3> 標籤
elements = driver.find_elements(By.XPATH, "//h2 | //h3")

# 初始化變量來保存結果
data = []
current_level = None

# 遍歷元素，構建數據結構
for element in elements[2:]:
    tag_name = element.tag_name
    text = element.text.strip()
    
    if tag_name == 'h2':
        # 提取 "Deluxe" 或其他關鍵字
        if "Deluxe" in text:
            key_word = "Deluxe"
        elif "Exclusive" in text:
            key_word = "Exclusive"
        elif "Premium" in text:
            key_word = "Premium"
        elif "Select" in text:
            key_word = "Select"
        elif "Ultra" in text:
            key_word = "Ultra"
        elif "time-limited" in text:
            key_word = "time-limited"
        elif "battle pass" in text:
            key_word = "battle pass"
            # 找出此 h2 下所有的 <li> 元素
            li_elements = driver.find_elements(By.XPATH, f"//h2[contains(text(), '{text}')]/following-sibling::ul/li")
            skins = [{"skin": li.text.strip()} for li in li_elements]
            current_level = {"level": key_word, "skins": skins}
            data.append(current_level)
            continue

        # 創建一個新的字典
        current_level = {"level": key_word, "skins": []}
        data.append(current_level)

    elif tag_name == 'h3' and current_level is not None:
        # 如果是 <h3>，將其添加到當前的 <h2> 下
        current_level["skins"].append({"skin": text})

# 關閉瀏覽器
driver.quit()

# 存儲為 JSON 文件
json_path = 'ValorantWebsite/public/get_database/database/valorant_skins.json'
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
