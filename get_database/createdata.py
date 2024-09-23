import subprocess
import tkinter as tk
from tkinter import messagebox

weapon_names = ["Ghost", "Classic", "Frenzy", "Sheriff", "Shorty", "Stinger", 
                "Spectre", "Judge", "Bucky", "Bulldog", "Guardian", "Vandal", 
                "Phantom", "Ares", "Odin", "Outlaw", "Marshal", "Operator", "Melee"]

# 假設你有多個檔案名存在 weapon_names 列表中
scripts = [f'get_weapon_{weapon}.py' for weapon in weapon_names]

# 定義每次要執行的進程數
max_processes = 4

# 同時執行指定數量的腳本
processes = []
for i in range(0, len(scripts), max_processes):
    # 執行當前批次的腳本
    for script in scripts[i:i + max_processes]:
        process = subprocess.Popen(['python', script])
        processes.append(process)

    # 等待當前批次完成
    for process in processes[-max_processes:]:
        process.wait()

# 彈出提示框
root = tk.Tk()
root.withdraw()  # 隱藏主窗口
messagebox.showinfo("完成", "Database has created perfectly!")
