"""
本代码由[Tkinter布局助手]生成
官网:https://www.pytk.net
QQ交流群:905019785
在线反馈:https://support.qq.com/product/618914
"""
import random
from tkinter import *
from tkinter.ttk import *
class WinGUI(Tk):
    def __init__(self):
        super().__init__()
        self.__win()
        self.tk_button_m78ru6db = self.__tk_button_m78ru6db(self)
        self.tk_button_m78rwahe = self.__tk_button_m78rwahe(self)
        self.tk_list_box_show = self.__tk_list_box_show(self)
        self.tk_label_m78t1b9u = self.__tk_label_m78t1b9u(self)
        self.tk_input_dpi = self.__tk_input_dpi(self)
        self.tk_label_m78t5msb = self.__tk_label_m78t5msb(self)
        self.tk_progressbar_result = self.__tk_progressbar_result(self)
    def __win(self):
        self.title("Tkinter布局助手")
        # 设置窗口大小、居中
        width = 359
        height = 239
        screenwidth = self.winfo_screenwidth()
        screenheight = self.winfo_screenheight()
        geometry = '%dx%d+%d+%d' % (width, height, (screenwidth - width) / 2, (screenheight - height) / 2)
        self.geometry(geometry)

        self.resizable(width=False, height=False)

    def scrollbar_autohide(self,vbar, hbar, widget):
        """自动隐藏滚动条"""
        def show():
            if vbar: vbar.lift(widget)
            if hbar: hbar.lift(widget)
        def hide():
            if vbar: vbar.lower(widget)
            if hbar: hbar.lower(widget)
        hide()
        widget.bind("<Enter>", lambda e: show())
        if vbar: vbar.bind("<Enter>", lambda e: show())
        if vbar: vbar.bind("<Leave>", lambda e: hide())
        if hbar: hbar.bind("<Enter>", lambda e: show())
        if hbar: hbar.bind("<Leave>", lambda e: hide())
        widget.bind("<Leave>", lambda e: hide())

    def v_scrollbar(self,vbar, widget, x, y, w, h, pw, ph):
        widget.configure(yscrollcommand=vbar.set)
        vbar.config(command=widget.yview)
        vbar.place(relx=(w + x) / pw, rely=y / ph, relheight=h / ph, anchor='ne')
    def h_scrollbar(self,hbar, widget, x, y, w, h, pw, ph):
        widget.configure(xscrollcommand=hbar.set)
        hbar.config(command=widget.xview)
        hbar.place(relx=x / pw, rely=(y + h) / ph, relwidth=w / pw, anchor='sw')
    def create_bar(self,master, widget,is_vbar,is_hbar, x, y, w, h, pw, ph):
        vbar, hbar = None, None
        if is_vbar:
            vbar = Scrollbar(master)
            self.v_scrollbar(vbar, widget, x, y, w, h, pw, ph)
        if is_hbar:
            hbar = Scrollbar(master, orient="horizontal")
            self.h_scrollbar(hbar, widget, x, y, w, h, pw, ph)
        self.scrollbar_autohide(vbar, hbar, widget)
    def __tk_button_m78ru6db(self,parent):
        btn = Button(parent, text="点击上传PDF文件", takefocus=False,)
        btn.place(x=18, y=9, width=320, height=30)
        return btn
    def __tk_button_m78rwahe(self,parent):
        btn = Button(parent, text="点击导出为图片", takefocus=False,)
        btn.place(x=218, y=162, width=120, height=30)
        return btn
    def __tk_list_box_show(self,parent):
        lb = Listbox(parent)

        lb.place(x=18, y=47, width=320, height=106)
        return lb
    def __tk_label_m78t1b9u(self,parent):
        label = Label(parent,text="设置DPI（可选）：",anchor="center", )
        label.place(x=18, y=162, width=121, height=30)
        return label
    def __tk_input_dpi(self,parent):
        ipt = Entry(parent, )
        ipt.place(x=123, y=162, width=73, height=30)
        return ipt
    def __tk_label_m78t5msb(self,parent):
        label = Label(parent,text="DPI值越大越清晰，文件大小也越大",anchor="center", )
        label.place(x=18, y=200, width=196, height=30)
        return label
    def __tk_progressbar_result(self,parent):
        progressbar = Progressbar(parent, orient=HORIZONTAL,)
        progressbar.place(x=218, y=200, width=120, height=30)
        return progressbar
class Win(WinGUI):
    def __init__(self, controller):
        self.ctl = controller
        super().__init__()
        self.__event_bind()
        self.__style_config()
        self.ctl.init(self)
    def __event_bind(self):
        self.tk_button_m78ru6db.bind('<Button-1>',self.ctl.select)
        self.tk_button_m78rwahe.bind('<Button-1>',self.ctl.output)
        pass
    def __style_config(self):
        pass
if __name__ == "__main__":
    win = WinGUI()
    win.mainloop()
