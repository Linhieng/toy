/**
 * 参考文档：
 *  https://help.aliyun.com/zh/oss/developer-reference/postobject
 *  https://developer.mozilla.org/en-US/docs/Glossary/HMAC
 */

import * as cryptoJs from 'crypto-js'
// @ts-ignore 在浏览器模块中，上面的 import * as cryptoJs 不生效
const CryptoJS = (cryptoJs?.default || cryptoJs) as typeof cryptoJs

const MIN_CONTENT_LENGTH_BYTE = 1
const MAX_CONTENT_LENGTH_BYTE = 20 * 1024 * 1024
const FOLDER = 'blog/' // 需以 / 结尾


const form = document.querySelector('form') as HTMLFormElement
form.onsubmit = (e) => {

    e.preventDefault()

    const method = 'POST'
    const formdata = new FormData(form)

    const access_key_id = formdata.get('AccessKeyID')
    const access_key_secret = formdata.get('AccessKeySecret') as string
    const oss_region = formdata.get('oss-region')
    const bucket_name = formdata.get('bucket-name')
    const file = formdata.get('file') as File
    const host = `https://${bucket_name}.${oss_region}.aliyuncs.com`

    const body = new FormData()

    body.append('success_action_status', "201") // 默认返回 204
    body.append('x-oss-meta-origin-name', file.name)

    body.append('OSSAccessKeyId', access_key_id) // 必需
    body.append('Policy', getPolicy()) // 必需
    body.append('Signature', getSignature(access_key_secret)) // 必需
    body.append('Key', generateDestFileFullName(FOLDER, file.name)) // 必需
    body.append('file', file) // 必须在最后

    const req = new Request(host, { method, body })

    fetch(req).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.text()
    }).then(xmlText => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
        const location = xmlDoc.querySelector('Location').textContent
        showRes(location)
    })
}


/**
 *
 * @returns 返回一段经过 UTF-8 和 Base64 编码的JSON文本
 */
function getPolicy() {
    const policyText = {
        // 设置该 Policy 的失效时间，超过这个失效时间之后，就没有办法通过这个 policy 上传文件了
        // 格式为 ISO8601 GMT
        "expiration": getNowISOTime(1), // 必需。
        "conditions": [ // 必须指定下面一项内容。用于指定 post 的条件，不符合时请求将会失败
            ["eq", "$success_action_status", "201"], // 要求有配置返回 201 的表单项
            ["content-length-range", MIN_CONTENT_LENGTH_BYTE, MAX_CONTENT_LENGTH_BYTE], // 设置上传文件的大小限制
            ["starts-with", "$key", FOLDER], // 指定上传文件的名称规则。
            ["in", "$content-type", [ // 更多内容请查阅 https://help.aliyun.com/zh/oss/user-guide/configure-the-content-type-header
                "image/jpg",
                "image/png",
                "image/webp",
                "image/jpeg",
                "image/svg+xml",
                "image/x-icon",
                "image/gif"
            ]],
            // 更多内容请查看文档
        ]
    }

    const policyBase64 = btoa(JSON.stringify(policyText))
    return policyBase64
}

/**
 * Signature: 根据 AccessKey Secret 和 Policy 计算的签名信息，
 * OSS验证该签名信息从而验证该Post请求的合法性。
 *
 * 采取签名版本1， Signature = base64(hmac-sha1(AccessKeySecret, base64(policy)))
 * 详见 https://help.aliyun.com/zh/oss/developer-reference/postobject#46182fabcdbay
 *
 * @param accessKeySecret 阿里云 RAM 用户的 AccessKey Secret
 * @returns
 */
function getSignature(accessKeySecret: string) {
    const policyBase64 = getPolicy()
    const message = policyBase64
    const key = accessKeySecret
    // 	或借助 nodejs 内置模块 crypto.createHmac('sha1', key).update(message).digest('base64')
    const signature = CryptoJS.HmacSHA1(message, key).toString(CryptoJS.enc.Base64)
    return signature
}



function getUUID_Time() {
    const date = new Date()
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const d = (date.getDate()).toString().padStart(2, '0')
    const h = date.getHours().toString().padStart(2, '0')
    const mu = date.getMinutes().toString().padStart(2, '0')
    const mi = date.getMilliseconds().toString().padStart(3, '0')
    const rd = Math.random().toString(16).substring(2, 5)
    return `${y}-${m}-${d}__${h}-${mu}-${mi}__${rd}`
}


function generateDestFileFullName(folder: string, originFilename: string) {
    const extname = originFilename.split('.').at(-1)
    return `${folder}${getUUID_Time()}.${extname}`
}

function getNowISOTime(delayMinute: number) {
    const current = Date.now()
    const delay = delayMinute * 1000
    return new Date(current + delay).toISOString()
}

function showRes(src: string) {
    const showEl = document.getElementById('show-location')
    showEl.innerHTML = `<img src="${src}" alt="preview">
    <br> <a href="${src}">${src}</a>
    `
}
