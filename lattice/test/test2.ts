const BLACK = 0
const WHITE = 255

const testBtn = document.querySelector('button') as HTMLButtonElement
const textarea = document.querySelector('textarea') as HTMLTextAreaElement
const showEl = document.querySelector('#show') as HTMLDivElement

testBtn.addEventListener('click', (evt) => {
    const pixelGrid = x2bin(str2arr(textarea.value))
    renderFont(pixelGrid)
    renderCanvas(pixelGrid)
})

/**
 * 将字符串中的内容提取成二维数组
 * @param str
 * @returns
 */
function str2arr(str: string) {
    const grid = [] as string[][]

    str.split('}').forEach((v) => {
        const l = v.length
        const row = [] as string[]
        for (let i = 0; i < l - 2; ) {
            if (v[i] === '0') {
                const str16 = v.slice(i + 2, i + 4)
                row.push(str16)
                i += 4
            } else {
                i++
            }
        }
        row.length > 0 && grid.push(row)
    })
    return grid
}

/**
 * 将值为 16 进制的二维数组转换为 2 进制的数组
 * @param gird
 */
function x2bin(gird: string[][]) {
    const pixelGrid = [] as number[][]
    gird.forEach((rowV, rowI) => {
        rowV.forEach((str16) => {
            const num16 = Number.parseInt(str16, 16)
            const str2 = num16.toString(2).padStart(8, '0')
            const strArr2 = str2.split('').reverse() // ❗ 具体要不要反转，得看低位在前还是高位在前
            const numArr2 = strArr2.map((v) => Number(v))
            for (let j = 0; j < 8; j++) {
                if (pixelGrid[rowI * 8 + j] instanceof Array) {
                    pixelGrid[rowI * 8 + j].push(numArr2[j])
                } else {
                    pixelGrid[rowI * 8 + j] = [numArr2[j]]
                }
            }
        })
    })
    return pixelGrid
}

/**
 * 将 0 1 数组展示的页面上（性能消耗巨大），而且没有 canvas 清晰
 * @param pixelGrid
 */
function renderFont(pixelGrid: number[][]) {
    let htmlTemplate = ``
    pixelGrid.forEach((row) => {
        htmlTemplate += '<div>'
        row.forEach((item) => {
            htmlTemplate += `<span class="a${item}">${item}</span>`
        })
        htmlTemplate += '</div>'
    })

    showEl.innerHTML = htmlTemplate
}

/**
 * 将二值数组绘制在 canvas 上（性能正常）
 * @param pixelGrid
 * @returns
 */
function renderCanvas(pixelGrid: number[][]) {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const height = pixelGrid.length
    const width = pixelGrid[0].length

    const arr = new Uint8ClampedArray(height * width * 4)

    pixelGrid.flat().forEach((v, i) => {
        const color = v === 1 ? WHITE : BLACK
        arr[i * 4 + 0] = color // R value
        arr[i * 4 + 1] = color // G value
        arr[i * 4 + 2] = color // B value
        arr[i * 4 + 3] = 255 // A value
    })

    // Initialize a new ImageData object
    let imageData = new ImageData(arr, width, height)

    canvas.width = width
    canvas.height = height
    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0)
}
