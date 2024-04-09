#Requires AutoHotkey v2.0
#SingleInstance force

; 不好用！

DetectHiddenWindows True

; 我之所以不喜欢微软自动的 Shift 切换输入模式，是因为它很容易“误触”——并不是容易误按 shift，而是：
; 比如有时候想输入大写的某个字母，于是先按下 shift， 但按下后又突然不想输入内容了，
; 于是松开了 shift。这个过程中 shift 表现为“长按”，但 Windows 依旧会切换输入模式！
; 于是我决定编写脚本来阻止 shift 长按时候的功能 —— 切换输入模式。
; 经过自己的测试，我正常单击 shift 时，基本不会超过 200ms

~Shift::
{
    KeyWait("Shift", "T0.25")
    start := getMode()
    ToolTip start

    if (TimeoutError) {
        ; 不超时的时候，也会进入此处，所以需要再判断
        if (A_TimeSinceThisHotkey > 250) { ; 超时

            KeyWait "Shift" ; 等待 shift 松开

            ; 若 Shift 按住的整个过程中，有按下其他任何按键，则此时输入模式不会变化。
            ; 问题是如何知道这个过程中是否有其他按键？
            ; 理论上通过对比按下前后的输入模式是否变化来判断
            ; 但问题是 getMode 并不准确！
            if (start != getMode()) {
                Send "{Shift}"
                ToolTip "添加 shift"
            } else {
                ToolTip "不做操作"
            }
        }
    }
}

getMode() {
    ; 并不准确。连续快速切换时，会发现卡住的现象
    ; 则在某些输入中，则完全检测错误！比如网易有道翻译的“翻译”区域
    return SendMessage( 0x283, 1, 0, , "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", winGetID("A"), "Uint") )
}
