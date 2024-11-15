const {contextBridge, ipcRenderer} = require('electron')

// 既能访问一部分浏览器
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (element, text) => {
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        // 也能访问一部分 node
        const version = process.versions[dependency]
        replaceText(document.getElementById(`${dependency}-version`), version)
    }
})

// 向渲染器传递消息，第二个参数将会添加在 window 对象上
contextBridge.exposeInMainWorld('a_api', {
    writeFile: (text) => {
        // 向主进程传递数据，类似于事件模型一样进行通信
        ipcRenderer.send('writeFile', text)
    },
    readFile: async () => {
        // 接收主进程中的数据，这里也可以在后面传参给主进程
        const text = await ipcRenderer.invoke('readFile', 'test.txt')
        return text
    }
})