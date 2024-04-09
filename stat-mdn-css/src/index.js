const fs = require('fs')
const cheerio = require('cheerio')
const { dirname, join: j } = require('path')
const { getElementContent } = require('./utils')
// 由于 vscode 中有多个工作目录，导致 nodejs 读取相对路径时可能跳到另外一个目录中
// 所以这里需要处理一下
process.chdir(dirname(__filename))

const importModule = './package/limit.mjs'
const page_download_path = './mdn/'
const mdn_css_page = j(page_download_path, './mdn-css.html')
const css_dir = j(page_download_path, 'css/')
const savePath = 'result.json'

main()

async function main() {
    // 创建必要的文件夹
    initPath()
    // 下载 css 页面
    await download_css_page()
    // 解析出所有 style 样式
    const all_props = parse_css_props()
    // 下载所有 style 样式所对应的页面
    await download_all_props(all_props)
    // 获取所有 css 样式的可继承属性
    const css_props = parse_css_props_inherit(all_props)
    // 将结果保存到 json 文件中。
    saveResult(css_props)
}
function initPath() {
    if (!fs.existsSync(page_download_path)) {
        fs.mkdirSync(page_download_path)
    }
    if (!fs.existsSync(css_dir)) {
        fs.mkdirSync(css_dir)
    }
}
async function download_css_page() {
    if (fs.existsSync(mdn_css_page)) {
        console.log('hit cache: mdn-css.html')
        return
    }
    const response = await fetch('https://developer.mozilla.org/en-US/docs/Web/CSS')
    const data = await response.text()
    fs.writeFileSync(mdn_css_page, data, 'utf8')
}
/**
 *
 * @returns {AllProps[]}
 */
function parse_css_props() {
    const doc = fs.readFileSync(mdn_css_page, 'utf8')
    const $ = cheerio.load(doc)
    $summary = $('li.toggle > details > summary:contains("Properties")')
    $summary_ol = $summary.siblings()
    $a_list = $summary_ol.find('a[href^=/en-US/docs/Web/CSS/]')
    const all_props = []
    Array.from($a_list).forEach(ele => {
        let nonStandard = false
        let deprecated = false
        let experimental = false
        const info = []
        let nextSibling = ele.nextSibling
        while (nextSibling) {
            info.push(getElementContent(nextSibling))
            nextSibling = nextSibling.nextSibling
        }
        if (info.includes('Non-standard')) {
            nonStandard = true
        }
        if (info.includes('Deprecated')) {
            deprecated = true
        }
        if (info.includes('Experimental')) {
            experimental = true
        }
        const href = ele.attribs.href
        all_props.push(
            {
                props: href.split('/').at(-1),
                href,
                url: 'https://developer.mozilla.org' + href,
                nonStandard,
                deprecated,
                experimental,
            }
        )
    })
    return all_props
}
/**
 *
 * @param {AllProps[]} all_props
 */
async function download_all_props(all_props) {
    const { default: asyncLimit } = await import(importModule)
    const limit = asyncLimit(3)

    const fetchFnArr = []
    const len = all_props.length
    all_props.forEach((prop, i) => {
        fetchFnArr.push(limit.call(
            async () => {
                const filePath = j(css_dir, `${prop.props}.html`)
                if (fs.existsSync(filePath)) {
                    console.log(`${i + 1}/${len} hit cache: ${prop.props}.html`)
                    return
                }

                console.log(`fetching ${prop.url}`)
                const res = await fetch(prop.url)
                const data = await res.text()
                fs.writeFileSync(filePath, data, 'utf8')
                console.log(`✅ ${i + 1}/${len}: ${prop.url}`)
            }
        ))
    })
    await Promise.allSettled(fetchFnArr)
}

/**
 *
 * @param {AllProps[]} all_props
 * @return {CssProps[]}
 */
function parse_css_props_inherit(all_props) {
    const new_all_props = JSON.parse(JSON.stringify(all_props))
    const len = new_all_props.length
    new_all_props.forEach((prop, index) => {
        const file = j(css_dir, `${prop.props}.html`)
        const isInherit = get_css_props_inherit_val(file)
        prop.inherit = isInherit
        console.log(`${index + 1}/${len} parse done: ${prop.props}`)
    })
    return new_all_props
}
/**
 * 获取页面中的 Inherited 值
 *
 * @param {string} file
 * @returns {'no' | 'yes'}
 */
function get_css_props_inherit_val(file) {
    const doc = fs.readFileSync(file, 'utf8')
    const $ = cheerio.load(doc)
    const inheritVal = $('a[href=/en-US/docs/Web/CSS/Inheritance]').parent().siblings().text()
    return inheritVal
}

/**
 *
 * @param {Object} props
 */
function saveResult(props) {
    fs.writeFileSync(savePath, JSON.stringify(props, null, 4), 'utf8')
}
