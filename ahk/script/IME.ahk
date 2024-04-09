#Requires AutoHotkey v2.0
#SingleInstance force

; 只使用微软拼音，并且关闭系统自带的语言模式切换，通过 autoHotkey 自定义

; 通过修改注册表来设置微软拼音输入法工具栏为水平。
RegWrite "0", "REG_DWORD", "HKEY_CURRENT_USER\SOFTWARE\Microsoft\InputMethod\Settings\CHS", "ToolBarOrientation"

DetectHiddenWindows True

; 方案一：左 shift 始终切换到英文；右 shift 始终切换到中文
; ~LShift:: switch_mode(0)
; ~RShift:: switch_mode(1025)

; 方案二： win+space 实现语言切换
A_MenuMaskKey := "vkE8"
#Space::
{
    ; bug: 在网易有道词典的“翻译”中不生效。代码执行了，但不生效，我觉得是 SendMessage 中的 winTitle 问题
    ; bug: 在防火墙高级设置，添加规则过程中的输入框中不生效
    mode := 0
    ; text := "ENG"
    if ifEnglishMode() {
        mode := 1025
        ; text := "zh-CN"
    }
    switch_mode(mode)

    ; ToolTip "switch to " text
    ; SetTimer () => ToolTip(), -1000
}


ifEnglishMode() {
    return 0 == SendMessage( 0x283, 1, 0, , "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", winGetID("A"), "Uint") )
}


switch_mode(mode)
{
    SendMessage( 0x283, 2, mode, , "ahk_id " DllCall("imm32\ImmGetDefaultIMEWnd", "Uint", winGetID("A"),) )
}
