const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('node:fs')

const createWindow = () => {
    // 创建一个窗口
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // 指定我们的预加载文件
            preload: path.join(__dirname, 'preload.js')
        }
    })  
    // 监听预加载脚本中的信道（类似于事件）
    ipcMain.on('writeFile', (_, text) => fs.writeFileSync('test.txt', text, 'utf8'))    
    // handle，用于向预加载脚本传递数据。
    ipcMain.handle('readFile', (_, filename) => fs.readFileSync(filename, 'utf8'))

    // 往这个窗口中加载我们的前端页面。也可以调用 .loadUrl 直接加载一个网页
    win.loadFile('pages/index.html')
}




// 下面是固定写法，不用在意

app.on('ready', () => {
    createWindow()
    // 这里是用来适应 Mac 的，因为 Mac 创建所有窗口后程序并不会退出，而是会留一个图标。
    // 点点击图标时就是所谓的 activate，此时会判断一下是否有窗口，没有则新建
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// 当所有窗口都关闭了，而且不是 Mac 时，就结束该程序。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})