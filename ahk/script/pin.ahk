; Easy Pin
#Requires AutoHotkey v2.0
#SingleInstance force

CapsLock & ~XButton2::  ; 鼠标的前进键
EP_PinWindow(*)
{
    MouseGetPos , , &EP_MouseWinID
    WinSetAlwaysOnTop true, EP_MouseWinID
}


CapsLock & ~XButton1::  ; 鼠标的后退键
EP_UnpinWindow(*)
{
    MouseGetPos , , &EP_MouseWinID
    WinSetAlwaysOnTop false, EP_MouseWinID
}
