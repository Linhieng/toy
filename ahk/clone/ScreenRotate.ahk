; https://www.reddit.com/r/AutoHotkey/comments/1d3t4n8/comment/l6a3mll/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
#Requires AutoHotkey v2.0

^#Right::ScreenRotate("Clockwise")
^#Left::ScreenRotate("CounterClockwise")

^1::ScreenRotate(0) ; Landscape
^2::ScreenRotate(90) ; Portrait
^3::ScreenRotate(180) ; Landscape (flipped)
^4::ScreenRotate(270) ; Portrait (flipped)


; https://www.autohotkey.com/boards/viewtopic.php?p=525222#p525222
/**
 * @param Orientation - Landscape, Portrait, Landscape (flipped), Portrait (flipped), or angle 0, 90, 180, 270. Can also be rotation direction: Clockwise, CounterClockwise.
 * @param MonNumber - which monitor to change orientation of. Defaults to monitor 1.
 * @param save - true or false. Orientation setting persists after reboot or only for the current session.
 */
ScreenRotate(Orientation:='Landscape', MonNumber:=1, save:=1) {
    static DMDO_DEFAULT := 0, DMDO_90 := 1, DMDO_180 := 2, DMDO_270 := 3, dmSize := 220

    NumPut('Short', dmSize, DEVMODE := Buffer(dmSize, 0), 68)
    display := '\\.\DISPLAY' MonNumber
    DllCall('EnumDisplaySettings', 'Str', display, 'Int', -1, 'Ptr', DEVMODE)
    n0 := NumGet(DEVMODE, 172, 'UInt') ; dmPelsWidth
    n1 := NumGet(DEVMODE, 176, 'UInt') ; dmPelHeight
    b := n0 < n1 ; true if Height is greater than Width
    ; If the current orientation is portrait and new orientation is landscape, width and height is flipped, and vice versa.
    ; Create 64-bit integer.
    dimension0 := n% b% | n%!b% << 32
    dimension1 := n%!b% | n% b% << 32
    currentOrientation := NumGet(DEVMODE, 84, 'Int')
    switch Orientation, false {
        case 'Clockwise':
            Orientation := (--currentOrientation) < DMDO_DEFAULT ? DMDO_270 : currentOrientation
        case 'CClockwise', 'CounterClockwise':
            Orientation := (++currentOrientation) > DMDO_270 ? DMDO_DEFAULT : currentOrientation
        case 'Landscape'          ,   0: orientation := DMDO_DEFAULT
        case 'Portrait'           ,  90: orientation := DMDO_90
        case 'Landscape (flipped)', 180: orientation := DMDO_180
        case 'Portrait (flipped)' , 270: orientation := DMDO_270
        default:                         orientation := DMDO_DEFAULT
    }

    NumPut('Int', orientation , DEVMODE,  84)
    NumPut('Int64', dimension%(Orientation&1)%, DEVMODE, 172)
    DllCall('ChangeDisplaySettingsEx', 'Str', display, 'Ptr', DEVMODE, 'Ptr', 0, 'UInt', save, 'Ptr', 0)
}
