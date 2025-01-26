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
        self.tk_label_m6a3gba4 = self.__tk_label_m6a3gba4(self)
        self.tk_label_m6a3gffq = self.__tk_label_m6a3gffq(self)
        self.tk_label_m6a3ggus = self.__tk_label_m6a3ggus(self)
        self.tk_label_m6a3gi7j = self.__tk_label_m6a3gi7j(self)
        self.tk_label_m6a3h8g4 = self.__tk_label_m6a3h8g4(self)
        self.tk_input_product = self.__tk_input_product(self)
        self.tk_input_unit = self.__tk_input_unit(self)
        self.tk_input_price = self.__tk_input_price(self)
        self.tk_input_num = self.__tk_input_num(self)
        self.tk_input_sum = self.__tk_input_sum(self)
        self.tk_table_ = self.__tk_table_(self)
        self.tk_button_add = self.__tk_button_add(self)
        self.tk_button_del = self.__tk_button_del(self)
        self.tk_button_modify = self.__tk_button_modify(self)
        self.tk_button_up = self.__tk_button_up(self)
        self.tk_button_down = self.__tk_button_down(self)
        self.tk_text_names = self.__tk_text_names(self)
        self.tk_label_m6a4593t = self.__tk_label_m6a4593t(self)
        self.tk_button_generate = self.__tk_button_generate(self)
    def __win(self):
        self.title("Tkinter布局助手")
        # 设置窗口大小、居中
        width = 694
        height = 612
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
    def __tk_label_m6a3gba4(self,parent):
        label = Label(parent,text="商品名称",anchor="center", )
        label.place(x=20, y=20, width=64, height=30)
        return label
    def __tk_label_m6a3gffq(self,parent):
        label = Label(parent,text="单位",anchor="center", )
        label.place(x=305, y=20, width=50, height=30)
        return label
    def __tk_label_m6a3ggus(self,parent):
        label = Label(parent,text="单价（元）",anchor="center", )
        label.place(x=370, y=20, width=73, height=30)
        return label
    def __tk_label_m6a3gi7j(self,parent):
        label = Label(parent,text="数量",anchor="center", )
        label.place(x=445, y=20, width=50, height=30)
        return label
    def __tk_label_m6a3h8g4(self,parent):
        label = Label(parent,text="金额（元）",anchor="center", )
        label.place(x=500, y=20, width=66, height=30)
        return label
    def __tk_input_product(self,parent):
        ipt = Entry(parent, )
        ipt.place(x=20, y=50, width=280, height=30)
        return ipt
    def __tk_input_unit(self,parent):
        ipt = Entry(parent, )
        ipt.place(x=305, y=50, width=60, height=30)
        return ipt
    def __tk_input_price(self,parent):
        ipt = Entry(parent, )
        ipt.place(x=370, y=50, width=70, height=30)
        return ipt
    def __tk_input_num(self,parent):
        ipt = Entry(parent, )
        ipt.place(x=445, y=50, width=50, height=30)
        return ipt
    def __tk_input_sum(self,parent):
        ipt = Entry(parent, )
        ipt.place(x=500, y=50, width=70, height=30)
        return ipt
    def __tk_table_(self,parent):
        # 表头字段 表头宽度
        columns = {"商品名称":282,"单位":66,"单价（元）":72,"数量":55,"金额（元）":77}
        tk_table = Treeview(parent, show="headings", columns=list(columns),)
        for text, width in columns.items():  # 批量设置列属性
            tk_table.heading(text, text=text, anchor='center')
            tk_table.column(text, anchor='center', width=width, stretch=False)  # stretch 不自动拉伸

        tk_table.place(x=20, y=90, width=555, height=150)
        return tk_table
    def __tk_button_add(self,parent):
        btn = Button(parent, text="往末尾添加", takefocus=False,)
        btn.place(x=590, y=50, width=90, height=30)
        return btn
    def __tk_button_del(self,parent):
        btn = Button(parent, text="删除选中项", takefocus=False,)
        btn.place(x=590, y=90, width=90, height=30)
        return btn
    def __tk_button_modify(self,parent):
        btn = Button(parent, text="修改选中项", takefocus=False,)
        btn.place(x=590, y=130, width=90, height=30)
        return btn
    def __tk_button_up(self,parent):
        btn = Button(parent, text="选中项上移", takefocus=False,)
        btn.place(x=590, y=169, width=90, height=30)
        return btn
    def __tk_button_down(self,parent):
        btn = Button(parent, text="选中项下移", takefocus=False,)
        btn.place(x=590, y=209, width=90, height=30)
        return btn
    def __tk_text_names(self,parent):
        text = Text(parent)
        text.place(x=20, y=286, width=145, height=320)
        self.create_bar(parent, text,True, False, 20, 286, 145,320,694,612)
        return text
    def __tk_label_m6a4593t(self,parent):
        label = Label(parent,text="输入人名（一行一个）",anchor="center", )
        label.place(x=20, y=255, width=120, height=30)
        return label
    def __tk_button_generate(self,parent):
        btn = Button(parent, text="生成表格", takefocus=False,)
        btn.place(x=349, y=384, width=338, height=217)
        return btn
class Win(WinGUI):
    def __init__(self, controller):
        self.ctl = controller
        super().__init__()
        self.__event_bind()
        self.__style_config()
        self.ctl.init(self)
    def __event_bind(self):
        self.tk_button_add.bind('<Button-1>',self.ctl.add)
        self.tk_button_del.bind('<Button-1>',self.ctl.delete)
        self.tk_button_modify.bind('<Button-1>',self.ctl.modify)
        self.tk_button_up.bind('<Button-1>',self.ctl.up)
        self.tk_button_down.bind('<Button-1>',self.ctl.down)
        self.tk_button_generate.bind('<Button-1>',self.ctl.generate)
        pass
    def __style_config(self):
        pass
if __name__ == "__main__":
    win = WinGUI()
    win.mainloop()
