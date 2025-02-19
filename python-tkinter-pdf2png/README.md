# python 实现 pdf 转图片

使用方式：

- 参考 [运行环境 - PaddleOCR 文档](https://paddlepaddle.github.io/PaddleOCR/latest/ppocr/environment.html#11-windows) 配置 python 环境
- 前往 [Releases · oschwartz10612/poppler-windows](https://github.com/oschwartz10612/poppler-windows/releases) 安装 poppler，将其安装在 `C:\soft\zip\poppler-24.08.0\`。如果要更换位置，记得替换 control.py 文件中的第 75 行代码 `poppler_path = r"C:\soft\zip\poppler-24.08.0\Library\bin"`
- 在新创建的 conda 环境中，安装 `pdf2image`，然后运行 `python main.py` 即可。
- 如果要打包成 exe 文件，可以在虚拟环境中执行下面代码
  - `pip install pyinstaller`
  - `pyinstaller --onefile -w main.py`

```
我已经打包好 exe 文件，想要的可以直接下载
https://wwdn.lanzouw.com/i1T112o8wxhc
密码:dnc8
```
