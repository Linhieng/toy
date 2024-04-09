#Requires AutoHotkey v2.0
#SingleInstance force

; Launch_Media 代替鼠标单击。Launch_Media 是魔咖单模87键盘设置在原 Fn 按键上的。
; Launch_Media::Click


; Win+M 打开 wt 终端
A_MenuMaskKey := "vkE8"
windowTernimalPath := Format("C:\Users\{1}\AppData\Local\Microsoft\WindowsApps\wt.exe", A_UserName)
#M::
{
    Run windowTernimalPath
}
