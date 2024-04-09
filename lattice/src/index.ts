import { getC51Str } from './c51.js'
import { previewInImg, generateBlackWhiteImg, getImgData } from './utils.js'

const loadImgFileEl = document.querySelector('#file') as HTMLInputElement
const imgEl = document.querySelector('img')
const scaleBtnEl = document.querySelector('#btn-scale') as HTMLButtonElement
const generateBlackWhiteBtnEl = document.querySelector(
    '#btn-bit'
) as HTMLButtonElement
const generateCodeBtnEl = document.querySelector(
    '#get-c51'
) as HTMLButtonElement
const btnCopyEl = document.querySelector('#copy-c51') as HTMLButtonElement
const widthEl = document.querySelector('#width') as HTMLInputElement
const heightEl = document.querySelector('#height') as HTMLInputElement
const canvasBitEl = document.querySelector('canvas') as HTMLCanvasElement
const c51TextEl = document.querySelector('#c51-text') as HTMLTextAreaElement

/**
 * 点击上传图片
 */
loadImgFileEl.addEventListener('change', (evt) => {
    if (
        evt.currentTarget instanceof HTMLInputElement &&
        evt.currentTarget.files instanceof FileList
    ) {
        imgFile = evt.currentTarget.files[0]
        previewInImg(imgFile, imgEl)
    }
})

/**
 * 点击放缩图片
 */
scaleBtnEl.addEventListener('click', () => {
    const width = Number.parseInt(widthEl.value)
    const height = Number.parseInt(heightEl.value)
    previewInImg(imgFile, imgEl, width, height)
})

/**
 * 点击生成黑白图片
 */
generateBlackWhiteBtnEl.addEventListener('click', () => {
    const imgData = getImgData(imgEl)
    generateBlackWhiteImg(imgData, canvasBitEl)
})

/**
 * 点击生成 C51 编码格式
 */
generateCodeBtnEl.addEventListener('click', () => {
    const str = getC51Str(getImgData(imgEl))
    c51TextEl.textContent = str
})

/**
 * 点击复制 textarea 文本框内容
 */
btnCopyEl.addEventListener('click', () => {
    c51TextEl.select()
    document.execCommand('copy') // 🗑️已废弃，但能用
})
