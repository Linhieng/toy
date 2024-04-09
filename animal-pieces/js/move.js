// move 为全局函数

// 通过第一个小鸟运动的例子，来注释异步逻辑
{
  move = (animal) => {
    
    // 小鸟运动时，不需要 delay，而是在这里实现延迟
    animalWrap.classList.remove('delay')

    switch (animal) {
      case 'crow':
        return crow()

      case 'frog':
        return frog()
    }
    
  }
  function crow () { 
    return setInterval(() => {
      new Promise((resolve) => {
        // 尾巴动一下
        animalWrap.classList.add('animal-move-one')
        // .1s 后动完，等 50ms 进行下一步
        setTimeout(() => resolve(), 150)
      })
      .then(_=> {
        // 尾巴收回来
        animalWrap.classList.remove('animal-move-one')
        return new Promise((resolve) => {
          // 收回来后，等 50ms 进行下一步
          setTimeout(() => resolve(), 150)
        })
      })
      .then(_=> {
        // 再动一下
        animalWrap.classList.add('animal-move-one')
        // .1s 后动完，进行下一步
        return new Promise((resolve) => {
          // 收回来后，进行下一步
          setTimeout(() => resolve(), 150)
        })
      })
      .then(_=> {
        // 再收回来
        animalWrap.classList.remove('animal-move-one')
        // 收回来后，进行下一步
        return new Promise((resolve) => {
          // 收回来后，进行下一步
          setTimeout(() => resolve(), 150)
        })
      })
      .then(_=> {
        // 张开嘴
        animalWrap.classList.add('animal-move-two')
        return new Promise((resolve) => {
          // 张开嘴后等 50ms 后进行下一步
          setTimeout(() => resolve(), 450)
        })
      })
      .then(_=> {
        // 抬一下头
        animalWrap.classList.add('animal-move-three')
        return new Promise((resolve) => {
        // 抬头完成后等300ms，进行下一步
          setTimeout(() => resolve(), 800)
        })
      })
      .then(_=> {
        // 回到初始状态，准备下一次循环
        animalWrap.classList.remove('animal-move-two')
        animalWrap.classList.remove('animal-move-three')
      })

    }, 3000);
  }

  function frog() {

    return setInterval(() => {
  
      new Promise((resolve) => {
        // 眼睛动一下
        animalWrap.classList.add('animal-move-one')
        setTimeout(() => resolve(), 150)
      })
      .then(_=> {
        // 眼睛收回来
        animalWrap.classList.remove('animal-move-one')
        return new Promise((resolve) => {
          // 收回来后，等 50ms 进行下一步
          setTimeout(() => resolve(), 150)
        })
      })
      .then(_=> {
        // 再动一下
        animalWrap.classList.add('animal-move-one')
        // .1s 后动完，进行下一步
        return new Promise((resolve) => {
          // 收回来后，进行下一步
          setTimeout(() => resolve(), 60)
        })
      })
      .then(_=> {
        // 再收回来
        animalWrap.classList.remove('animal-move-one')
        // 收回来后，进行下一步
        return new Promise((resolve) => {
          // 收回来后，进行下一步
          setTimeout(() => resolve(), 100)
        })
      })
      .then(_=> {
        // 下巴鼓包
        animalWrap.classList.add('animal-move-two')
        return new Promise((resolve) => {
          // 张开嘴后等 50ms 后进行下一步
          setTimeout(() => resolve(), 250)
        })
      })
      .then(_=> {
        // // 下巴收包 回到初始状态，准备下一次循环
        animalWrap.classList.remove('animal-move-two')
      })
  
    }, 3000);
  }
}