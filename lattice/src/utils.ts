/**
 * 根据给定宽高，将图片文件渲染在 imgEl 元素上
 * @param imgFile
 * @param imgEl
 * @param width
 * @param height
 * @returns
 */
export function previewInImg(
    imgFile: File,
    imgEl: HTMLImageElement,
    width?: number,
    height?: number
) {
    if (!imgFile) return

    const reader = new FileReader()
    reader.onload = (e) => {
        const result = e.target.result
        if (typeof result !== 'string') {
            return
        }
        imgEl.src = result
        imgEl.style.width = width ? `${width}px` : ''
        imgEl.style.height = height ? `${height}px` : ''
    }
    reader.readAsDataURL(imgFile)
}

/**
 * 将 img 图片处理为 imageData 对象，支持指定宽高
 * @param img
 * @param width
 * @param height
 * @returns 返回一个 imageData 对象
 */
export function getImgData(
    img: HTMLImageElement,
    width?: number,
    height?: number
): ImageData {
    const imgStyle = getComputedStyle(img)
    if (!width) {
        width = Number.parseInt(imgStyle.width)
    }
    if (!height) {
        height = Number.parseInt(imgStyle.height)
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = width
    canvas.height = height

    ctx.drawImage(img, 0, 0, width, height)
    return ctx.getImageData(0, 0, width, height)
}

/**
 * 将 imgData 变为黑白图片，并渲染在 canvasBitEl 上
 * @param imgData
 * @param canvasBitEl
 */
export function generateBlackWhiteImg(
    imgData: ImageData,
    canvasBitEl: HTMLCanvasElement
) {
    const width = imgData.width
    const height = imgData.height
    const ctx = canvasBitEl.getContext('2d', { willReadFrequently: true })
    const data = imgData.data

    // 目前直接简单粗暴的二值化，后续可考虑使用数字图像算法进行黑白处理。
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i]
        const green = data[i + 1]
        const blue = data[i + 2]

        const average = (red + green + blue) / 3 > 127 ? 255 : 0

        data[i] = average
        data[i + 1] = average
        data[i + 2] = average
    }

    canvasBitEl.width = width
    canvasBitEl.height = height
    ctx.putImageData(imgData, 0, 0)
}
