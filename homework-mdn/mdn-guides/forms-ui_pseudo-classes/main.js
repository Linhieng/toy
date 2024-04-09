// 等待页面完成加载
document.addEventListener(
  'DOMContentLoaded',
  () => {
    // 向复选框附加 `change` 事件
    document
      .getElementById('billing-checkbox')
      .addEventListener('change', toggleBilling)
  },
  false,
)

function toggleBilling () {
  // 切换账单文本输入状态
  const billingInputs = document.querySelectorAll('#billing input[type="text"]')
  for (const input of billingInputs) {
    input.disabled = !input.disabled
  }

  /* 可选： 当不颠倒 input 和 label 时，通过 JS 操作类名 */
  // 选择账单文本标签
  // const billingLabels = document.querySelectorAll('.billing-label')
  // for (const label of billingLabels) {
  //   const classStr = label.getAttribute('class')
  //   if (/disabled-label/.test(classStr)) {
  //     label.setAttribute('class', classStr.replace(/disabled-label/, ''))
  //   } else {
  //     label.setAttribute('class', `${classStr} disabled-label`)
  //   }
  // }
}
