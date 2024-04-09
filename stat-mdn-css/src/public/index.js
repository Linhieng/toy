main()

async function main() {
    // 先获取到数据
    const result = await loadResult()

    // 然后对数据进行分类，一类是可继承，一类是不可继承
    const result2 = classifyResult(result)

    // 对两列数据渲染到页面上
    drawResult(result2)
}

async function loadResult() {
    const res = await fetch('/result.json')
    if (!res.ok) {
        console.error(res)
        return
    }
    const data = await res.text()
    return JSON.parse(data)
}

/**
 *
 * @param {CssProps[]} result
 * @return {{canInherit: CssProps[], notInherit:CssProps[]}}
 */
function classifyResult(result) {
    const canInherit = []
    const notInherit = []
    result.forEach(item => {
        if (item.inherit === 'yes') {
            canInherit.push(item)
        } else {
            notInherit.push(item)
        }
    })
    return {
        canInherit,
        notInherit
    }
}

/**
 *
 * @param {{canInherit: CssProps[], notInherit:CssProps[]}} result
 */
function drawResult(result) {
    const canInheritBox = document.querySelector('.canInherit > .props-box')
    const notInheritBox = document.querySelector('.notInherit > .props-box')

    canInheritBox.append(
        generateFragmentList(result.canInherit)
    )
    notInheritBox.append(
        generateFragmentList(result.notInherit)
    )
}

/**
 *
 * @param {CssProps[]} CssProps
 * @returns
 */
function generateFragmentList(CssProps) {
    const fragment = document.createDocumentFragment()
    fragment.appendChild(document.createElement('ul'))
    const ul = fragment.querySelector('ul')
    CssProps.forEach((item) => {
        const li = document.createElement("li")
        li.innerHTML = `<a href="${item.url}" target="_blank">${item.props}</a>
            ${ item.nonStandard ? '<span>非标准</span>' : '' }
            ${ item.deprecated ? '<span>已废弃</span>' : '' }
            ${ item.experimental ? '<span>实验性</span>' : '' }
        `
        ul.appendChild(li)
    })
    return fragment
}
