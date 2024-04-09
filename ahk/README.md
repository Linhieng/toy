# 我的 AutoHotkey 脚本

快捷链接：

- [按键列表](https://www.autohotkey.com/docs/v2/KeyList.htm)
- [热键修饰符](https://www.autohotkey.com/docs/v2/Hotkeys.htm#Symbols)
- [函数列表](https://www.autohotkey.com/docs/v2/lib/index.htm)
- [内置变量 A_](https://www.autohotkey.com/docs/v2/Variables.htm#BuiltIn)

TODO:

-   如何解决打开程序时状态栏中的闪烁问题。复现步骤如下：
    1.  按下 `Win` 键，弹出 HOME 页面
    2.  按下 `Win+M` 打开 wt 终端
    3.  此时 wt 终端窗口会闪烁

        理论解决方案：点击闪烁位置即可解决。问题在于如何找到闪缩的坐标？

## 语言与输入法

- 中英键盘切换

    ```ahk
    PostMessage 0x0050, 0, 0x4090409,, "A"  ; 英语（美国）
    PostMessage 0x0050, 0, 0x0000804,, "A"  ; 中文（简体，中国）
    ```

- 获取微软拼音当前模式（中/英/全半角等）

    有时候查询有错误（连续切换输入模式）
    某些情况无法查询（网易翻译）
    ```ahk
    DetectHiddenWindows True
    mode := SendMessage(
        0x283,  ; Message:  WM_IME_CONTROL
        1,      ; wParam:   IMC_GETCONVERSIONMODE
        0,      ; lParam：  (NoArgs)
        ,       ; Control： (Window)
        "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", winGetID("A"), "Uint")
    )
    MsgBox(mode)
    ```

- 微软拼音的中英模式切换

    ```ahk
    DetectHiddenWindows True
    SendMessage(
        0x283,  ; Message: WM_IME_CONTROL
        2,      ; wParam : 1(IMC_GETCONVERSIONMODE), 2(IMC_SETCONVERSIONMODE)
        1025,   ; lParam : 0(英文半角), 1025(中文), 1033(中文+全角), 1(中文+英文标点)
        ,       ; Control： (Window)
        "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", winGetID("A"), "Uint")
    )
    ```
