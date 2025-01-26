# 礼品签名表生成

这个项目是学习 python tkinter 过程的一个小作品，其中的 UI 界面是采用 [Tkinter布局助手](https://pytk.net/) 实现的。
至于 control.py 中的代码，大部分是询问 AI 得到对应组件的 api，然后基于 ai 给出的案例代码改写而来。

打包采用的是 pyinstaller，打包时推荐创建一个新的虚拟环境进行打包，这样打包出来的体积最小，我这边打包后只有 10.4M，相比 electron 开发的应用程序，体积小太多太多了。

```sh
pyinstaller --onefile -w main.py
```
