exports.getElementContent = (ele) => {

    // Text 类型
    if (ele.nodeType === 3) {
        return ele.nodeValue.trim()
    }
    // Element 类型
    if (ele.nodeType === 1) {
        if (ele.childNodes.length < 1) return ''
        return ele.childNodes.reduce((pre, cur) => {
            return pre + this.getElementContent(cur)
        }, '')
    }
    // 其他类型暂时不做处理
    return ''
}
