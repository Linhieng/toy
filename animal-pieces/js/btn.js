const btn = document.getElementById('btn')
const navBtn = btn.getElementsByClassName('nav-btn')
const prev = document.getElementById('btnPrev')
const next = document.getElementById('btnNext')

prev.addEventListener('click', () => {
  // 关闭小动作
  clearInterval(timer)
  // 开启高延迟, 长的变化时间
  animalWrap.classList.add('high-delay-reserved')
  animalWrap.classList.add('long-duration')
  
  // 变色
  let color = '#ba94de'
  document.body.style.backgroundColor = color
  changeColor(color)

  // 改变动物
  animalWrap.classList.remove('frog')
  animalWrap.classList.add('crow')

  setTimeout(() => {
    // 关闭 delay
    animalWrap.classList.remove('high-delay-reserved')
    animalWrap.classList.remove('long-duration')
    // 开启小动作
    timer = move('crow')
  }, 1000);
})

next.addEventListener('click', () => {
  // 关闭小动作
  clearInterval(timer)

  // 开启高延迟，长的变化时间
  animalWrap.classList.add('high-delay')
  animalWrap.classList.add('long-duration')
  
  // 变色
  let color = '#785ebb'
  document.body.style.backgroundColor = color
  changeColor(color)

  // 改变动物
  animalWrap.classList.remove('crow')
  animalWrap.classList.add('frog')

  setTimeout(() => {
    // 关闭 delay
    animalWrap.classList.remove('high-delay')
    animalWrap.classList.remove('long-duration')
    // 开启小动作
    timer = move('frog')
  }, 1000);
})

// 改变按钮背景色
function changeColor (color) {
  for (let i = 0; i < navBtn.length; i++) {
    navBtn[i].style.backgroundColor = color
  }
}