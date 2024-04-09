const fs = require('fs')

let subtitle = fs.readFileSync('简英双语字幕 - 原版.srt', 'utf-8')
subtitle = subtitle.replace(/(?<=\b([A-Zl]*))l(?=([A-Zl]*)\b)/g, 'I')
subtitle = subtitle.replace(/\r\n/g, '\n')
// f1()
// f2()

function f1 () {
    // 对白前的角色说明
    let a = subtitle.match(/(?<=\n)\{\\fs11\}[A-Z]+( \d ?)?: /g)
    console.log(a.length)

    let s = new Set()
    for (const x of a) {
        s.add(x)
    }

    console.log(s)

}

function f2 () {
    // 未翻译的内容，主要是背景声音之类的。这应该是为听力障碍的人服务的。
    let a = subtitle.match(/(?<=.* --> .*\n\{\\fs11\}).*(?=\{\\r\})/g)
    console.log(a.length)
    let s = new Set()
    for (const x of a) {
        s.add(x)
    }
    console.log(s)
}
