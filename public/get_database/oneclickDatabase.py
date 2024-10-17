import subprocess
import tkinter as tk
from tkinter import ttk, messagebox

def run_python_scripts(scripts):
    # 建立主窗口
    root = tk.Tk()
    root.title("執行進度")
    root.geometry("300x100")

    # 創建進度條
    progress = ttk.Progressbar(root, length=200, mode='determinate')
    progress.pack(pady=20)

    # 創建標籤顯示當前執行的腳本
    script_label = tk.Label(root, text="")
    script_label.pack()

    # 更新進度條的函式
    def update_progress(current, total):
        progress['value'] = (current / total) * 100
        root.update_idletasks()

    def run_scripts():
        for i, script in enumerate(scripts):
            try:
                script_label.config(text=f"正在執行: {script}")
                print(f"正在執行: {script}")
                result = subprocess.run(["python", script], check=True, capture_output=True, text=True)
                print(f"{script} 執行成功，輸出內容如下：\n{result.stdout}")
            except subprocess.CalledProcessError as e:
                print(f"{script} 執行失敗，錯誤內容如下：\n{e.stderr}")
                messagebox.showerror("錯誤", f"{script} 執行失敗")
                root.quit()
                return
            
            # 更新進度條
            update_progress(i + 1, len(scripts))

        # 全部執行完成後顯示訊息
        messagebox.showinfo("完成", "資料庫已創建完成")
        root.quit()

    # 使用 after 方法來啟動腳本執行
    root.after(100, run_scripts)

    # 啟動主循環
    root.mainloop()

# 依次執行的 Python 檔案清單
scripts_to_run = [
    "createdata.py",
    "get_skinPrice.py",
    "database/data_merge.py"
]

# 啟動執行
run_python_scripts(scripts_to_run)