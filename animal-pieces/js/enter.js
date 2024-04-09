
{
  const enter = document.getElementById('enter')
  // 按钮
  const enterBtn = enter.getElementsByClassName('enterBtn')[0]
  const btn = document.getElementById('btn')
  // 是否允许点击跳转
  let canClick = false
  
  setTimeout(() => { // 800ms 后开始动画
  
    new Promise((resolve) => {
      // 显示圆圈
      animalWrap.classList.remove('bg-transparent')
      // 1s 后进行下一步
      setTimeout(() => resolve(), 1000)
    })
    .then(_=> {
      // 变化时间短，低延迟
      animalWrap.classList.add('short-duration')
      animalWrap.classList.add('low-delay')
      // 圆圈-->四周碎片
      animalWrap.classList.remove('circle')
      animalWrap.classList.add('flakes')
      // 1s 后进行下一步
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 1000)
      })
    })
    .then(_=> {
      // 变化时间短，高延迟
      animalWrap.classList.remove('low-delay')
      animalWrap.classList.add('high-delay')
      // 四周-->piece
      animalWrap.classList.remove('flakes')
      animalWrap.classList.add('piece')
      // 红色磷光
      animalWrap.classList.add('flow-red')
      setTimeout(() => {
        enterBtn.style.opacity = '1'
        canClick = true
      }, 1000);
    })

  }, 800);

  // 当点击时，piece 变成 鸟，enter 消失，btn显现
  enter.onclick = () => {
    if (!canClick) return;
    // 背景色变色！
    document.body.style.backgroundColor = '#ba94de'
    enter.style.display = 'none'
    btn.style.display = 'block'
    animalWrap.classList.remove('flow-red')
    // 变化时间长，高延迟(反向)
    animalWrap.classList.remove('short-duration')
    animalWrap.classList.remove('high-delay')
    animalWrap.classList.add('long-duration')
    animalWrap.classList.add('high-delay-reserved')
      // 前面写了
    // piece 变成鸟
    animalWrap.classList.remove('piece')
    animalWrap.classList.add('crow')

    setTimeout(() => {
      // 变化完成后 关闭变化时间的控制和延迟
      animalWrap.classList.remove('long-duration')
      animalWrap.classList.remove('high-delay-reserved')
      // 已经开始进入动物页面了, 动物会发出小动作
      timer = move('crow')
      animalWrap.classList.add('flow-white')
    }, 1000);
  }

}